const HoloqMouseVFX = (function() {
  'use strict';

  // Detect Firefox/Librewolf
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || 
                    navigator.userAgent.toLowerCase().indexOf('librewolf') > -1;

  const CONFIG = {
    // Use only ASCII characters that are guaranteed monospace width
    SCRAMBLE_CHARS: isFirefox ? 
      '#%&*+-/0123456789=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{}~' :
      '▓▒░█▄▀▌▐│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌αβγδεζηθικλμνξοπρστυφχψω∞∂∇∈∉∋∌∑∏√∛∜≈≠≤≥⊕⊗⊙⊘',
    DECAY_RATE: isFirefox ? 0.88 : 0.92,  // Faster decay for Firefox (more dynamic)
    DIFFUSION_RATE: isFirefox ? 0.22 : 0.15,  // More energy spread for Firefox
    EXCITATION_THRESHOLD: isFirefox ? 0.35 : 0.4, // Lower threshold for Firefox (more activity)
    SPONTANEOUS_RATE: isFirefox ? 0.0015 : 0.0008, // More spontaneous energy for Firefox
    FEEDBACK_THRESHOLD: 0.8, // Threshold for neighbor triggering (raised)
    FEEDBACK_STRENGTH: isFirefox ? 0.15 : 0.1,  // More feedback for Firefox
    FPS: 30,  // Keep same FPS for all browsers
    WAVE_SPEED: isFirefox ? 0.08 : 0.05,  // Faster wave for Firefox to compensate for no scrambling
  };

  let pre, container;
  let characters = [];
  let cellStates = [];  // Continuous values [0, 1] for each character
  let animationFrameId;
  let lastFrameTime = 0;
  let isMode2 = false;
  let wavePhase = 0;  // For the rushing wave effect
  let originalPyramidHTML = null;  // Store the original HTML to prevent corruption and preserve eye spans

  function init(el) {
    // Set mode state
    isMode2 = document.body.classList.contains('mode2');

    // Cancel any existing animation
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    
    // Reset state
    characters = [];
    cellStates = [];

    container = el;
    pre = container.querySelector('pre');
    
    // Store original HTML on first init to preserve eye spans
    if (!originalPyramidHTML) {
      originalPyramidHTML = pre.innerHTML;
    }
    
    // Restore original HTML to reset any scrambling
    pre.innerHTML = originalPyramidHTML;
    
    // Now work with the existing spans
    const allSpans = pre.querySelectorAll('span');
    const textNodes = [];
    
    // Get all text nodes (not inside spans)
    function getTextNodes(node) {
      if (node.nodeType === 3) { // Text node
        textNodes.push(node);
      } else {
        for (let child of node.childNodes) {
          if (child.nodeName !== 'SPAN') {
            getTextNodes(child);
          }
        }
      }
    }
    getTextNodes(pre);
    
    // Convert text nodes to spans
    textNodes.forEach(textNode => {
      const text = textNode.textContent;
      const fragment = document.createDocumentFragment();
      for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        fragment.appendChild(span);
      }
      textNode.parentNode.replaceChild(fragment, textNode);
    });

    // Now get all spans (including eye spans)
    const allSpansAfter = pre.querySelectorAll('span');
    
    let x = 0;
    let y = 0;
    let maxX = 0;
    
    // Process all spans to create character objects
    allSpansAfter.forEach((span, i) => {
      const char = span.textContent;
      const isWhitespace = char === ' ' || char === '\n' || char === '\r';
      const isEye = span.classList.contains('eye');
      const isQ = char === 'Q' && span.hasAttribute('data-x'); // The special Q portal
      
      characters.push({
        span: span,
        originalChar: char,
        x: x,
        y: y,
        isWhitespace: isWhitespace,
        isEye: isEye,  // Track if this is part of an eye
        isQ: isQ,      // Track if this is the special Q
        index: i
      });
      
      // Initialize cell state - pyramid chars start with small random energy
      // Q starts with more energy, other eyes with less
      if (isWhitespace) {
        cellStates.push(0);
      } else if (isQ) {
        cellStates.push(Math.random() * 0.3); // Q accumulates more energy
      } else if (isEye) {
        cellStates.push(Math.random() * 0.05); // Other eye parts start with less
      } else {
        cellStates.push(Math.random() * 0.1);
      }

      if (char === '\n') {
        maxX = Math.max(maxX, x);
        y++;
        x = 0;
      } else {
        x++;
      }
    });
    
    // Second pass: identify neighbors and kaomoji groups
    // Find kaomoji face groups (consecutive horizontal eye cells)
    const eyeGroups = [];
    let currentGroup = null;
    
    characters.forEach((char, i) => {
      if (char.isEye) {
        // Check if this continues a group on the same line
        if (currentGroup && currentGroup.y === char.y && 
            char.x === currentGroup.lastX + 1) {
          // Continue the group
          currentGroup.members.push(i);
          currentGroup.lastX = char.x;
        } else {
          // Start a new group
          currentGroup = {
            members: [i],
            y: char.y,
            lastX: char.x
          };
          eyeGroups.push(currentGroup);
        }
        // Store group reference in character
        char.eyeGroup = currentGroup;
      } else {
        currentGroup = null;
      }
    });
    
    // Now set up neighbors for cellular automaton
    characters.forEach((char, i) => {
      char.neighbors = [];
      
      // Find 8 surrounding neighbors (Moore neighborhood)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          
          const neighbor = characters.find(c => 
            c.x === char.x + dx && 
            c.y === char.y + dy && 
            !c.isWhitespace
          );
          
          if (neighbor) {
            char.neighbors.push(neighbor.index);
          }
        }
      }
    });

    // No mouse listeners - just start the passive wave animation
    startAnimation();
  }

  function startAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  function animate(timestamp) {
    // Update mode state
    isMode2 = document.body.classList.contains('mode2');

    const elapsed = timestamp - lastFrameTime;
    const interval = 1000 / CONFIG.FPS;

    if (elapsed > interval) {
      lastFrameTime = timestamp - (elapsed % interval);
      
      // Update wave phase for rushing effect
      wavePhase += CONFIG.WAVE_SPEED;
      
      // Calculate total system energy
      let totalEnergy = 0;
      let activeCount = 0;
      for (let i = 0; i < characters.length; i++) {
        if (!characters[i].isWhitespace) {
          totalEnergy += cellStates[i];
          activeCount++;
        }
      }
      const avgEnergy = totalEnergy / activeCount;
      
      // Determine if wave should add or remove energy (homeostasis)
      const targetEnergy = 0.3; // Target average energy level
      const energyDiff = targetEnergy - avgEnergy;
      const waveStrength = energyDiff * 0.5; // How strongly wave corrects
      
      // Create new state array for next iteration
      const newStates = [...cellStates];
      
      // Update each cell based on continuous cellular automaton rules
      for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (char.isWhitespace) continue;
        
        let state = cellStates[i];
        
        // 1. Decay: energy naturally dissipates
        state *= CONFIG.DECAY_RATE;
        
        // 2. Diffusion: energy spreads to/from neighbors
        if (char.neighbors && char.neighbors.length > 0) {
          let neighborSum = 0;
          char.neighbors.forEach(nIdx => {
            neighborSum += cellStates[nIdx];
          });
          const avgNeighbor = neighborSum / char.neighbors.length;
          state += (avgNeighbor - state) * CONFIG.DIFFUSION_RATE;
        }
        
        // 3. Spontaneous excitation: random energy injection
        if (Math.random() < CONFIG.SPONTANEOUS_RATE) {
          // Q accumulates energy differently
          if (char.isQ) {
            state = Math.min(state + 0.3, 1.0); // Q accumulates energy
          } else {
            state = 1.0; // Sudden burst of energy
            
            // If this is an eye, energize the entire kaomoji face
            if (char.isEye && char.eyeGroup && !char.isQ) {
              char.eyeGroup.members.forEach(memberIdx => {
                if (memberIdx !== i) {
                  newStates[memberIdx] = Math.max(newStates[memberIdx], 0.8);
                }
              });
            }
          }
        }
        
        // 3a. Q ENERGY BURST - When Q reaches threshold, burst to all kaomoji
        if (char.isQ && state > 0.85) {
          // Q has reached critical mass - send energy burst to all kaomoji faces!
          eyeGroups.forEach(group => {
            group.members.forEach(memberIdx => {
              const targetChar = characters[memberIdx];
              if (!targetChar.isQ) { // Don't send energy back to Q
                newStates[memberIdx] = Math.min(newStates[memberIdx] + 0.6, 1.0);
              }
            });
          });
          // Q releases its energy
          state = 0.2;
        }
        
        // 3b. Eye group energy sharing - if one eye cell has energy, share with face
        if (char.isEye && char.eyeGroup && state > CONFIG.EXCITATION_THRESHOLD) {
          // Share energy with rest of kaomoji face
          const avgEnergy = char.eyeGroup.members.reduce((sum, idx) => 
            sum + cellStates[idx], 0) / char.eyeGroup.members.length;
          
          // Pull all cells toward the average
          state = state * 0.7 + avgEnergy * 0.3;
        }
        
        // 4. Nonlinear feedback: excited cells can trigger neighbors
        if (state > CONFIG.FEEDBACK_THRESHOLD) {
          // Highly excited cells inject energy into neighbors
          char.neighbors.forEach(nIdx => {
            newStates[nIdx] = Math.min(1.0, newStates[nIdx] + CONFIG.FEEDBACK_STRENGTH);
          });
        }
        
        // 5. RUSHING WAVE EFFECT - additive energy modifier
        // Wave travels diagonally from top-left to bottom-right
        const wavePosition = (char.x + char.y * 2) * 0.1;
        const waveValue = Math.sin(wavePhase - wavePosition);
        
        // Wave adds or removes energy based on system state
        if (waveValue > 0) {
          // Positive wave: add energy if system is low, remove if high
          const waveEffect = waveValue * waveStrength;
          state += waveEffect;
        }
        
        // Clamp to [0, 1]
        state = Math.max(0, Math.min(1, state));
        newStates[i] = state;
        
        // Quantize to display: scramble if above threshold
        if (state > CONFIG.EXCITATION_THRESHOLD) {
          // Don't scramble eye characters - they keep their kaomoji faces
          if (!char.isEye) {
            // Firefox: skip text scrambling entirely to prevent jitter
            if (!isFirefox) {
              char.span.textContent = CONFIG.SCRAMBLE_CHARS[Math.floor(Math.random() * CONFIG.SCRAMBLE_CHARS.length)];
            }
          }
          
          // Color lerp based on position hash and alien energy
          const positionHash = (char.x * 7919 + char.y * 6271) % 100; // Prime number hash
          const colorChoice = positionHash / 100; // 0-1 range
          const energyInfluence = state - CONFIG.EXCITATION_THRESHOLD; // How much above threshold
          
          // Graduated color curve - only peak energy gets pure colors
          const normalizedEnergy = Math.min(energyInfluence / (1 - CONFIG.EXCITATION_THRESHOLD), 1);
          
          // Three-stage color graduation
          let r, g, b;
          
          // Q accumulator shows energy buildup with special effects
          if (char.isQ) {
            // Q glows brighter as it accumulates energy
            if (normalizedEnergy < 0.3) {
              // Low energy: faint red glow
              r = 255;
              g = Math.floor(100 * normalizedEnergy);
              b = Math.floor(100 * normalizedEnergy);
            } else if (normalizedEnergy < 0.7) {
              // Building energy: orange to yellow
              const buildUp = (normalizedEnergy - 0.3) / 0.4;
              r = 255;
              g = Math.floor(100 + 155 * buildUp);
              b = Math.floor(30 * buildUp);
            } else {
              // Critical mass: bright white-yellow pulsing
              r = 255;
              g = 255;
              b = Math.floor(100 + 155 * Math.sin(Date.now() * 0.01));
            }
          } else if (char.isEye) {
            // Other kaomoji parts use green palette
            // Pure green gradient for eyes
            if (normalizedEnergy < 0.5) {
              // Low energy: bright green with white mix
              const tintAmount = normalizedEnergy * 2; // 0-1 range
              r = Math.floor(255 * (1 - tintAmount * 0.7));
              g = 255;
              b = Math.floor(255 * (1 - tintAmount * 0.9));
            } else {
              // High energy: pure bright green
              const intensity = (normalizedEnergy - 0.5) * 2; // 0-1 range
              r = Math.floor(255 * (1 - (0.7 + intensity * 0.3)));
              g = 255;
              b = Math.floor(255 * (1 - (0.9 + intensity * 0.1)));
            }
          } else {
            // Regular pyramid characters use original color scheme
            if (normalizedEnergy < 0.7) {
              // Low energy: mostly white with slight tint (keeps red high)
              const tintAmount = normalizedEnergy * 0.3; // Max 21% tint at 0.7 energy
              if (colorChoice < 0.5) {
                // Slight cyan tint
                r = Math.floor(255 * (1 - tintAmount * 0.3));
                g = 255;
                b = Math.floor(255 * (1 - tintAmount * 0.1));
              } else {
                // Slight green tint
                r = Math.floor(255 * (1 - tintAmount * 0.3));
                g = 255;
                b = Math.floor(255 * (1 - tintAmount * 0.3));
              }
            } else if (normalizedEnergy < 0.95) {
              // Medium energy: transition zone
              const midRange = (normalizedEnergy - 0.7) / 0.25; // 0-1 within this range
              const lerpAmount = midRange * 0.6; // Up to 60% color at 0.95
              if (colorChoice < 0.5) {
                // Moving towards cyan
                r = Math.floor(255 * (1 - lerpAmount * 0.8));
                g = 255;
                b = Math.floor(255 * (1 - lerpAmount * 0.2));
              } else {
                // Moving towards green
                r = Math.floor(255 * (1 - lerpAmount * 0.8));
                g = 255;
                b = Math.floor(255 * (1 - lerpAmount * 0.8));
              }
            } else {
              // Peak energy (0.95-1.0): PURE cyan or green
              const peakIntensity = (normalizedEnergy - 0.95) / 0.05; // 0-1 in peak range
              const finalLerp = 0.6 + (peakIntensity * 0.4); // 60% to 100% pure color
              if (colorChoice < 0.5) {
                // Pure cyan at peak
                r = Math.floor(255 * (1 - finalLerp));
                g = 255;
                b = Math.floor(255 * (1 - finalLerp * 0.05)); // Keep blue high for cyan
              } else {
                // Pure green at peak
                r = Math.floor(255 * (1 - finalLerp));
                g = 255;
                b = Math.floor(255 * (1 - finalLerp));
              }
            }
          }
          
          // Only apply color if energized, otherwise default red
          if (char.isEye && normalizedEnergy < 0.1) {
            // Low energy eyes stay default red
            char.span.style.color = '';
          } else {
            char.span.style.color = `rgb(${r}, ${g}, ${b})`;
          }
          
          // Add visual intensity based on energy level
          char.span.style.opacity = 0.7 + (state * 0.3);
        } else {
          // Restore original character
          if (!char.isEye) {
            // Firefox: only restore if we actually changed it
            if (!isFirefox) {
              char.span.textContent = char.originalChar;
            }
          }
          char.span.style.opacity = 1.0;
          char.span.style.color = ''; // Reset to default color (red)
        }
      }
      
      // Update states for next frame
      cellStates = newStates;
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  return {
    init: init
  };
})();