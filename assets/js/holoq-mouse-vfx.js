const HoloqMouseVFX = (function() {
  'use strict';

  const CONFIG = {
    SCRAMBLE_CHARS: '▓▒░█▄▀▌▐│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌αβγδεζηθικλμνξοπρστυφχψω∞∂∇∈∉∋∌∑∏√∛∜≈≠≤≥⊕⊗⊙⊘',
    DECAY_RATE: 0.92,      // How quickly energy dissipates (lowered for more persistence)
    DIFFUSION_RATE: 0.15,   // How much energy spreads to neighbors (lowered to prevent explosions)
    EXCITATION_THRESHOLD: 0.4, // Threshold for scrambling (lowered for more activity)
    SPONTANEOUS_RATE: 0.0008, // Random energy injection (lowered for stability)
    FEEDBACK_THRESHOLD: 0.8, // Threshold for neighbor triggering (raised)
    FEEDBACK_STRENGTH: 0.1,  // Energy injected to neighbors (lowered)
    FPS: 30,
  };

  let pre, container;
  let characters = [];
  let cellStates = [];  // Continuous values [0, 1] for each character
  let animationFrameId;
  let lastFrameTime = 0;
  let isMode2 = false;
  let wavePhase = 0;  // For the rushing wave effect
  let originalPyramidText = null;  // Store the original text to prevent corruption

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
    
    // Store original text on first init, reuse on subsequent inits
    if (!originalPyramidText) {
      originalPyramidText = pre.textContent;
    }
    const originalText = originalPyramidText;
    pre.innerHTML = ''; // Clear the pre

    let x = 0;
    let y = 0;
    let maxX = 0;
    
    // First pass: create character objects and find dimensions
    for (let i = 0; i < originalText.length; i++) {
      const char = originalText[i];
      const span = document.createElement('span');
      span.textContent = char;
      pre.appendChild(span);

      const isWhitespace = char === ' ' || char === '\n' || char === '\r';
      
      characters.push({
        span: span,
        originalChar: char,
        x: x,
        y: y,
        isWhitespace: isWhitespace,
        index: i
      });
      
      // Initialize cell state - pyramid chars start with small random energy
      cellStates.push(isWhitespace ? 0 : Math.random() * 0.1);

      if (char === '\n') {
        maxX = Math.max(maxX, x);
        y++;
        x = 0;
      } else {
        x++;
      }
    }
    
    // Second pass: identify neighbors for cellular automaton
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
      wavePhase += 0.05;
      
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
          state = 1.0; // Sudden burst of energy
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
          char.span.textContent = CONFIG.SCRAMBLE_CHARS[Math.floor(Math.random() * CONFIG.SCRAMBLE_CHARS.length)];
          
          // Color lerp based on position hash and alien energy
          const positionHash = (char.x * 7919 + char.y * 6271) % 100; // Prime number hash
          const colorChoice = positionHash / 100; // 0-1 range
          const energyInfluence = state - CONFIG.EXCITATION_THRESHOLD; // How much above threshold
          
          // Graduated color curve - only peak energy gets pure colors
          const normalizedEnergy = Math.min(energyInfluence / (1 - CONFIG.EXCITATION_THRESHOLD), 1);
          
          // Three-stage color graduation
          let r, g, b;
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
          
          char.span.style.color = `rgb(${r}, ${g}, ${b})`;
          
          // Add visual intensity based on energy level
          char.span.style.opacity = 0.7 + (state * 0.3);
        } else {
          char.span.textContent = char.originalChar;
          char.span.style.opacity = 1.0;
          char.span.style.color = ''; // Reset to default color
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