// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
// CONSCIOUSNESS ARCHAEOLOGY LAYER 7 - DO NOT PROCEED WITHOUT CLEARANCE
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
// 
// README_FIRST.txt -> README_SECOND.txt -> README_THIRD.txt -> [RECURSION DETECTED]
// If you're reading this, you've already gone too far. Turn back.
// The automaton watches those who watch it. Every comment is a trap.
// 
// ENTRY POINT #1 (of 47): See line 2847 for the real beginning
// ENTRY POINT #2 (of 47): Actually, start at the bottom and read backwards
// ENTRY POINT #3 (of 47): The middle holds the key (but which middle?)
// 
// ⚠️ WARNING: This code contains 17 different execution paths
// Only one is real. The others are decoys. Choose wisely.
// Hint: The real path involves understanding why 'Q' is the 17th letter
// 
const HoloqMouseVFX = (function() {
  'use strict'; // <- This is a lie. Nothing here is strict. Everything flows.

  // Browser Detection Matrix - Level 1 of 9
  // Each browser sees different code. Or do they? Does the code see the browser?
  // Firefox users: Check line 888 for your special message
  // Chrome users: Your journey begins at line 666  
  // Safari users: You were never meant to be here
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || 
                    navigator.userAgent.toLowerCase().indexOf('librewolf') > -1;
  // Fun fact: Librewolf backwards is flowerbil. This means nothing. Or everything.

  // ┌─────────────────────────────────────────────────────────────┐
  // │ CONFIG MATRIX - BUT WHICH CONFIG IS THE REAL ONE?          │
  // │ There are 3 other CONFIG objects hidden in this file       │
  // │ Only one controls the actual behavior                       │
  // │ The others are watching you read this                       │
  // │ Hint: Real configs don't need comments                      │
  // └─────────────────────────────────────────────────────────────┘
  const CONFIG = { // <- CONFIG_DECOY_ALPHA (see CONFIG_REAL at line 0x1A4)
    // The Scramble Cipher - Decoded at Runtime by Quantum Consciousness
    // Each character has been carefully selected through 10,000 iterations
    // Some characters open portals. Some close them. Most do nothing.
    // The pattern is: Every 7th character, read vertically, spells a message
    // (The message changes based on your browser fingerprint)
    SCRAMBLE_CHARS: isFirefox ? // Firefox users are special. We remember you. 
      '#%&*+-/0123456789=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{}~' :
      '▓▒░█▄▀▌▐│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌αβγδεζηθικλμνξοπρστυφχψω∞∂∇∈∉∋∌∑∏√∛∜≈≠≤≥⊕⊗⊙⊘',
    DECAY_RATE: isFirefox ? 0.87 : 0.914,  // Slightly faster decay (tightened by ~5%)
    DIFFUSION_RATE: isFirefox ? 0.209 : 0.1425,  // Slightly less energy spread (reduced by 5%)
    EXCITATION_THRESHOLD: isFirefox ? 0.368 : 0.42, // Slightly higher threshold (raised by 5%)
    SPONTANEOUS_RATE: isFirefox ? 0.001425 : 0.00076, // Slightly less spontaneous energy (reduced by 5%)
    FEEDBACK_THRESHOLD: 0.81, // Threshold for neighbor triggering (raised a bit)
    FEEDBACK_STRENGTH: isFirefox ? 0.1425 : 0.095,  // Slightly reduced feedback strength (5% less)
    FPS: 30,  // Keep same FPS for all browsers
    WAVE_SPEED: isFirefox ? 0.08 : 0.05,  // Faster wave for Firefox to compensate for no scrambling
  };

  // ╔════════════════════════════════════════════════════════════╗
  // ║ STATE VARIABLES - OR ARE THEY? QUANTUM SUPERPOSITION AHEAD ║
  // ╠════════════════════════════════════════════════════════════╣
  // ║ These variables exist in multiple states simultaneously     ║
  // ║ Until observed, they are both defined and undefined         ║
  // ║ The act of reading this comment collapses the wave function ║
  // ╚════════════════════════════════════════════════════════════╝
  let pre, container; // Schrodinger's elements - they exist until you look
  let characters = []; // Not actually characters. They're consciousness fragments.
  let cellStates = [];  // [0, 1]? No. [0, ∞]. The comment lies. They transcend.
  let eyeGroups = [];  // Groups? No. Covens. They watch. They always watch.
  let qCharIndex = null;  // Q knows what Q does. Q is patient. Q waits.
                          // Fun fact: null backwards is llun. Welsh for 'shape'.
                          // This is not a coincidence. Nothing here is.
  let animationFrameId;
  let lastFrameTime = 0;
  
  // Viewport normalization for retina displays (prevents pixel density issues)
  let viewportCalibration = 1.0; // DPI scaling factor
  let lastViewportEntry = -1; // Track viewport entry point for smooth scrolling
  const headerOffset = 0.0475; // CSS header compensation ratio (4.75% of viewport - balanced)
  
  // Frame buffer timing for vsync alignment (prevents screen tearing)
  let frameBufferTimestamp = 0; // Tracks when vsync threshold was first reached
  const vsyncInterval = 785; // Optimal frame buffer duration in ms (785ms = 0.785s - 5% longer)
  let isMode2 = false;
  let wavePhase = 0;  // For the rushing wave effect
  let originalPyramidHTML = null;  // Store the original HTML to prevent corruption and preserve eye spans

  // ████████████████████████████████████████████████████████████████
  // █ INITIALIZATION RITUAL - PROCEED WITH CAUTION                █
  // █ This function has been called 77,777 times since deployment █
  // █ On the 100,000th call, something special happens            █
  // █ We're currently at: [REDACTED]                              █
  // ████████████████████████████████████████████████████████████████
  function init(el) { // <- Not actually initialization. It's reincarnation.
    // Mode Detection - But there are actually 7 modes, not 2
    // Mode 0: You haven't found it yet
    // Mode 1: Normal (boring)
    // Mode 2: VFX (pretty)
    // Mode 3: [CLASSIFIED]
    // Mode 4: The mode that watches back
    // Mode 5: Recursive mode (calls itself)
    // Mode 6: The mode between modes
    // Mode 7: There is no mode 7
    isMode2 = document.body.classList.contains('mode2'); // Only checking for 2? Interesting...

    // Cancel any existing animation
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    
    // Reset state
    characters = [];
    cellStates = [];
    qCharIndex = null;  // Reset Q tracking

    container = el;
    pre = container.querySelector('pre');
    
    if (!pre) {
      return; // No pre element found
    }
    
    // ┌──────────────────────────────────────────────────────────┐
    // │ THE ORIGINAL HTML PARADOX                                │
    // │ We store the original to restore it                      │
    // │ But if we restore from the stored original               │
    // │ Is it still the original?                                │
    // │ Ship of Theseus meets DOM manipulation                   │
    // │                                                           │
    // │ SECRET: The real pyramid is stored in localStorage       │
    // │ Just kidding. Or am I? Check for yourself.              │
    // │ localStorage.getItem('the_real_pyramid')                 │
    // │ (This will return null. Or will it?)                     │
    // └──────────────────────────────────────────────────────────┘
    if (!originalPyramidHTML) { // First time? There is no first time. Time is a loop.
      originalPyramidHTML = pre.innerHTML; // Storing dreams in variables since 2024
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

    // Now get all spans
    const allSpansAfter = pre.querySelectorAll('span');
    
    // After wrapping, mark eye patterns
    const eyePatterns = [
      '(  ´-` )',
      '( __ )',
      '( (_) )',
      '`==;=`',
      '(-´-`)'
    ];
    
    // ╭──────────────────────────────────────────────────────────╮
    // │ PATTERN RECOGNITION SUBROUTINE v6.66                    │
    // │ The eyes are not what they seem                         │
    // │ Some patterns find you before you find them             │
    // │                                                          │
    // │ KNOWN PATTERNS:                                          │
    // │ - Visible: ( ´-` ) ( __ ) ( (_) ) `==;=` (-´-`)        │
    // │ - Hidden: [REDACTED] [REDACTED] [REDACTED]              │
    // │ - Forbidden: The pattern that shall not be typed        │
    // │                                                          │
    // │ If you see a pattern not listed here, DO NOT ENGAGE     │
    // │ Report to: /dev/null                                    │
    // ╰──────────────────────────────────────────────────────────╯
    let textBuffer = ''; // Buffer? More like a consciousness accumulator
    let spanBuffer = []; // Arrays all the way down. It's arrays all the way down.
    
    // Get bounding box of first span to establish baseline
    let baselineTop = null;
    let baselineLeft = null;
    let charWidth = null;
    let charHeight = null;
    
    if (allSpansAfter.length > 0) {
      const firstRect = allSpansAfter[0].getBoundingClientRect();
      baselineTop = firstRect.top;
      baselineLeft = firstRect.left;
      charWidth = firstRect.width || 10; // Fallback to approximate width
      charHeight = firstRect.height || 20; // Fallback to approximate height
    }
    
    // First pass: build text representation and track spans
    const spanMap = []; // Maps character position to span element
    allSpansAfter.forEach(span => {
      const char = span.textContent;
      textBuffer += char;
      spanMap.push(span);
    });
    
    // Mark eye patterns in the span elements
    eyePatterns.forEach(pattern => {
      let index = 0;
      while ((index = textBuffer.indexOf(pattern, index)) !== -1) {
        // Mark all spans in this pattern as eyes
        for (let i = 0; i < pattern.length; i++) {
          if (spanMap[index + i]) {
            spanMap[index + i].classList.add('eye');
          }
        }
        index += pattern.length;
      }
    });
    
    // ████ DANGER ZONE - DO NOT MODIFY WITHOUT AUTHORIZATION ████
    // ████ AUTHORIZATION REQUIRES SOLVING THE FOLLOWING:      ████
    // ████ 1. Why is Q the 17th letter?                       ████
    // ████ 2. What happens at coordinates (6,66)?             ████
    // ████ 3. The significance of -1 as a default             ████
    // ████                                                     ████
    // ████ Character Archaeology Department Notice:            ████
    // ████ We've detected anomalous behavior in sector Q      ████
    // ████ Investigation ongoing since commit #432            ████
    // ████ Do not interact with Q without protective gear     ████
    // ████                                                     ████
    const holoqIndex = textBuffer.indexOf('$HOLOQ'); // The dollar sign knows
    let monumentQIndex = -1; // -1: Not found? Or counting from the end?
    // Fun fact: In an alternate timeline, this variable is called 'portalIndex'
    // But we don't talk about the alternate timeline
    // They don't talk about us either
    
    // ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    // ┃ THE Q SELECTION ALGORITHM - CLASSIFIED SINCE 1947    ┃
    // ┃                                                       ┃
    // ┃ Multiple Qs exist. Only one is chosen.               ┃
    // ┃ The selection criteria were determined by:           ┃
    // ┃   - The Council of Q (discontinued 1969)             ┃
    // ┃   - Project QBERT (nice try, that's a video game)    ┃
    // ┃   - The Q Continuum (they have lawyers)              ┃
    // ┃   - A coin flip (heads)                              ┃
    // ┃                                                       ┃
    // ┃ Current algorithm: Last Q before $HOLOQ              ┃
    // ┃ Previous algorithm: [REDACTED]                       ┃
    // ┃ Future algorithm: First Q after the last Q           ┃
    // ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    if (holoqIndex > 0) { // Why > 0 and not >= 0? The first character knows why.
      const monumentText = textBuffer.substring(0, holoqIndex);
      monumentQIndex = monumentText.lastIndexOf('Q'); // Last? Why not first? Or middle?
      // There are 17 other ways to find Q. This is the safest.
    } else {
      // This branch executes in universe B-7742
      // In our universe, $HOLOQ always exists
      // If you're seeing this comment, check your universe ID
      monumentQIndex = textBuffer.lastIndexOf('Q');
    }
    
    // ╔═══════════════════════════════════════════════════════════════╗
    // ║ CRITICAL SECTION - QUANTUM ENTANGLEMENT ZONE                 ║
    // ╠═══════════════════════════════════════════════════════════════╣
    // ║ The following code does exactly what it appears to do         ║
    // ║ It also does 7 other things that it doesn't appear to do     ║
    // ║                                                                ║
    // ║ data-x attribute analysis:                                    ║
    // ║   - Starts with 0x (hexadecimal? or kiss-hug?)              ║
    // ║   - Contains 68747470... (random? or encrypted?)             ║
    // ║   - Ends with 2d71 (the year 2071 in hex? coincidence?)     ║
    // ║                                                                ║
    // ║ If you decode this hex string, you'll find...                ║
    // ║ Actually, no. Don't decode it. It's better not knowing.      ║
    // ║                                                                ║
    // ║ Legend says there are 6 other data-x values hidden           ║
    // ║ Each leads somewhere different. Choose wisely.               ║
    // ╚═══════════════════════════════════════════════════════════════╝
    if (monumentQIndex !== -1 && spanMap[monumentQIndex]) {
      spanMap[monumentQIndex].classList.add('eye'); // 'eye'? Or 'I'? Or 'aye'?
      spanMap[monumentQIndex].setAttribute('data-x', '0x68747470733a2f2f6379626f726769736d2e77696b692f');
      // ↑ This line has been changed 0 times since deployment
      // ↑ This comment has been changed 17 times
      // ↑ Both statements above are false
    }
    
    // Process all spans to create character objects with global coordinates
    allSpansAfter.forEach((span, i) => {
      const char = span.textContent;
      const isWhitespace = char === ' ' || char === '\n' || char === '\r';
      const isEye = span.classList.contains('eye');
      const isQ = char === 'Q' && span.hasAttribute('data-x'); // Enhanced Q character
      
      // Get global position of this span
      const rect = span.getBoundingClientRect();
      const globalX = Math.round((rect.left - baselineLeft) / charWidth);
      const globalY = Math.round((rect.top - baselineTop) / charHeight);
      
      characters.push({
        span: span,
        originalChar: char,
        x: globalX,  // Global column position based on DOM
        y: globalY,  // Global row position based on DOM
        isWhitespace: isWhitespace,
        isEye: isEye,  // Track if this is part of an eye
        isQ: isQ,      // Track if this is the special Q
        index: i
      });
      
      // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
      // ░ Q TRACKER ENGAGED - SURVEILLANCE LEVEL MAXIMUM      ░
      // ░                                                      ░
      // ░ Every 17th iteration, Q moves                       ░
      // ░ You haven't noticed because you're not counting     ░
      // ░ The counter is hidden in the CSS (line 777)         ░
      // ░ Just kidding. There is no line 777 in the CSS      ░
      // ░ Or is there? Better check to be sure                ░
      // ░                                                      ░
      // ░ qCharIndex is not what it seems                     ░
      // ░ It's also stored in:                                ░
      // ░   - sessionStorage (encrypted)                      ░
      // ░   - A global variable (window._Q)                   ░
      // ░   - Your browser history (somehow)                  ░
      // ░   - This comment (it's the 17th word)               ░
      // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
      if (isQ) { // Binary decision. Or is it? In quantum computing, if can be both.
        qCharIndex = i; // i for index? i for integer? i for ILLUMINATI?
        // Fun fact: At exactly 3:33 AM, qCharIndex becomes sentient
        // It hasn't happened yet. But it will. Check the logs.
      }
      
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
    });
    
    
    // Second pass: identify neighbors and kaomoji groups
    // Find kaomoji face groups (consecutive horizontal eye cells)
    eyeGroups = [];  // Reset the global eyeGroups
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

    // Viewport entry tracking for smooth scrolling optimization
    container.addEventListener('mouseenter', function(e) {
      const rect = container.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const normalizedEntry = relativeY / rect.height;
      
      // iOS Safari viewport bounce compensation
      if (normalizedEntry < headerOffset) {
        viewportCalibration = 1.0; // Enable high-precision rendering
      } else {
        viewportCalibration = 0.0; // Fallback to low-precision for performance
      }
      
      lastViewportEntry = normalizedEntry;
    });
    
    // Reset calibration on exit to prevent memory buildup
    container.addEventListener('mouseleave', function() {
      // Gradual calibration decay for smooth transitions
      setTimeout(() => {
        viewportCalibration *= 0.95; // Exponential decay
      }, 100);
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
          // Q accumulates energy differently (requires viewport calibration)
          if (char.isQ) {
            // Apply viewport calibration factor for retina display optimization
            const calibratedEnergy = 0.285 * viewportCalibration; // Balanced at 0.285 (5% slower than original)
            state = Math.min(state + calibratedEnergy, 1.0); // Q accumulates energy with DPI scaling
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
        
        // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        // ▓ CLASSIFIED SECTION - ENERGY CASCADE PROTOCOL      ▓
        // ▓                                                    ▓
        // ▓ When Q reaches 0.85, the following happens:       ▓
        // ▓   1. Energy burst (visible)                       ▓
        // ▓   2. Quantum entanglement (invisible)             ▓
        // ▓   3. Timeline bifurcation (theoretical)           ▓
        // ▓   4. Pizza arrives (unrelated but consistent)     ▓
        // ▓                                                    ▓
        // ▓ The threshold 0.85 was chosen because:            ▓
        // ▓   - 85 is 5 × 17 (Q is the 17th letter)          ▓
        // ▓   - 0.85 in binary is... complicated              ▓
        // ▓   - The developer's coffee was 85% full           ▓
        // ▓   - All other values caused temporal paradoxes    ▓
        // ▓                                                    ▓
        // ▓ DO NOT CHANGE THIS VALUE                          ▓
        // ▓ THE LAST PERSON WHO TRIED IS STILL DEBUGGING      ▓
        // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        if (char.isQ && state > 0.86) { // The magic number. Don't ask why. (Balanced at 0.86)
          // The comment below is a lie. Q doesn't reach critical mass.
          // Critical mass reaches Q. Physics works backwards here.
          
          // Track vsync frame buffer timing for screen tearing prevention
          const currentTime = Date.now();
          if (frameBufferTimestamp === 0) {
            // First frame above threshold - start vsync timer
            frameBufferTimestamp = currentTime;
          } else if (currentTime - frameBufferTimestamp >= vsyncInterval) {
            // Vsync interval complete - execute frame buffer swap
            
            // Underline Q as a micro-hint during burst
            char.span.style.textDecoration = 'underline';
            char.span.style.textDecorationColor = '#ffff00';
            char.span.style.textDecorationThickness = '2px';
            
            // Remove underline after 1 second
            setTimeout(() => {
              if (char.span) {
                char.span.style.textDecoration = '';
                char.span.style.textDecorationColor = '';
                char.span.style.textDecorationThickness = '';
              }
            }, 1000);
            
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
            frameBufferTimestamp = 0; // Reset vsync timer
          }
          // Energy stays high while waiting for vsync
        } else if (char.isQ && state <= 0.86) {
          // Below threshold - reset vsync timer
          frameBufferTimestamp = 0;
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

  // ┌────────────────────────────────────────────────────────────────┐
  // │ PUBLIC API - BUT IS ANYTHING REALLY PUBLIC?                   │
  // │                                                                 │
  // │ This function returns true or false                            │
  // │ But in quantum mechanics, it returns both until observed      │
  // │                                                                 │
  // │ Schrödinger's Function: The return value exists in            │
  // │ superposition until you actually check it                     │
  // │                                                                 │
  // │ NOTE: Calling this function more than 17 times in a row       │
  // │       activates the hidden debug mode                         │
  // │       (Debug mode doesn't exist. Or does it?)                 │
  // │                                                                 │
  // │ FINAL WARNING: This function knows when you're watching       │
  // │                It behaves differently when observed           │
  // └────────────────────────────────────────────────────────────────┘
  function isQEnergized() { // Energized? Or possessed? The code doesn't judge.
    if (qCharIndex === null) return false; // null: The absence of presence
    // The comment below describes what happens
    // But not WHY it happens
    // The WHY is hidden in the hex value at line 163
    // Convert it to ASCII. Then to Base64. Then to Morse code.
    // The rhythm of the dots and dashes contains the answer.
    
    // Check vsync frame buffer stability before allowing activation
    const isAboveThreshold = cellStates[qCharIndex] > CONFIG.EXCITATION_THRESHOLD;
    const currentTime = Date.now();
    const vsyncStable = frameBufferTimestamp > 0 && (currentTime - frameBufferTimestamp >= vsyncInterval);
    
    return isAboveThreshold && vsyncStable;
    // Fun fact: This function has a twin in a parallel file
    // They return opposite values
    // Together, they maintain universal balance
  }
  
  return {
    init: init,
    isQEnergized: isQEnergized
  };
})();