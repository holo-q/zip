// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
// HOLOQ VFX INITIALIZATION
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

// Pre-scramble everything before DOM loads
(function() {
  // Add mode2 class immediately
  document.documentElement.classList.add('initial-scramble');
})();

document.addEventListener('DOMContentLoaded', function() {
  // Initialize VFX system
  HoloqVFX.init();
  
  // Start with mode 2 active for scrambled state
  document.body.classList.add('mode2');
  
  // Immediately scramble everything including subtitles to VOID (complete random characters)
  const allElements = document.querySelectorAll('.content-section h1, .content-section h2, .content-section h3, .content-section h4, .content-section p, .content-section li, .site-nav a, #soul-quote, .holoq-subtitle span, .holoq-subtitle b, .content-section strong, .content-section em');
  
  // First, store original text and immediately replace with random characters
  allElements.forEach(el => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = el.textContent;
    }
    // Replace with random characters of same length (void state)
    const chars = '█▓▒░╔╗╚╝║═╬╣╠╩╦╤╧╪┼┴┬├┤┘┌└┐';
    const scrambled = el.textContent.split('').map(char => 
      char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    el.textContent = scrambled;
  });
  
  // After a brief moment, animate unscramble back to original text
  setTimeout(() => {
    document.body.classList.remove('mode2');
    document.documentElement.classList.remove('initial-scramble');
    
    // Animate from void state back to original text
    allElements.forEach(el => {
      const originalText = el.dataset.originalText || el.textContent;
      
      if (el.tagName === 'H1') {
        // For H1, use special scramble animation
        el.textContent = originalText; // Restore original first
        HoloqVFX.Scramble.h1(el, true, { duration: 1200 });
      } else {
        // For everything else, animate the unscramble
        el.textContent = originalText; // Restore original first
        HoloqVFX.Scramble.full(el, true, { duration: 800 });
      }
    });
  }, 500); // Slightly longer delay for more dramatic effect
  
  // MODE SWITCHING: Mode 1 vs Mode 2
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const mode1Content = document.getElementById('mode1-content');
  const mode2Content = document.getElementById('mode2-content');

  const allContentHeadings = document.querySelectorAll('.content-section h1, .content-section h2, .content-section h3');
  allContentHeadings.forEach(el => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = el.textContent;
    }
  });
  
  // Setup mode toggle handlers
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.dataset.mode;
      const currentContent = document.querySelector('.content-mode.active');
      const nextContent = mode === 'mode1' ? mode1Content : mode2Content;
      
      // Only proceed if not already on this mode
      if (currentContent === nextContent) return;

      currentContent.classList.add('fading-out');
      HoloqVFX.Scramble.full(currentContent, false, {
        duration: 300,
        onComplete: () => {
          currentContent.classList.remove('active', 'fading-out');
        }
      });

      setTimeout(() => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        if (mode === 'mode1') {
          HoloqVFX.Mode.exitMode2();
        } else {
          HoloqVFX.Mode.enterMode2();
        }

        nextContent.classList.add('active', 'fading-in');
        // Include ALL text elements for scrambling (subtitles, divs with text, etc)
        const elementsToScramble = nextContent.querySelectorAll('.content-section h1, .content-section h2, .content-section h3, .content-section h4, .content-section p, .content-section li, .holoq-subtitle span, .holoq-subtitle b, .content-section strong, .content-section em');

        elementsToScramble.forEach(el => {
          // No longer skip subtitle elements - scramble everything in mode 2
          // if (el.classList.contains('subtitle-line1') || el.classList.contains('subtitle-line2')) {
          //   return;
          // }
          
          if (el.tagName === 'H1') {
            HoloqVFX.Scramble.h1(el, true, { duration: 800 });
          } else {
            HoloqVFX.Scramble.full(el, true, { duration: 800 });
          }
        });
        
        // Restart the cellular automaton on the pyramid after mode switch
        const pyramidContainer = document.querySelector('.pyramid-container');
        if (pyramidContainer && typeof HoloqMouseVFX !== 'undefined') {
          // The automaton might have been disrupted, restart it
          HoloqMouseVFX.init(pyramidContainer);
        }
      }, 400);
    });
  });
  
  // Add hover scramble to navigation
  HoloqVFX.AutoEffects.addHoverScramble('.site-nav a', 200);
  
  // Add scroll-triggered scrambles to headers
  const resetScrollScrambles = HoloqVFX.AutoEffects.setupScrollScramble(
    '.content-section h1, .content-section h2, .content-section h3',
    { duration: 400, threshold: 0.5 }
  );
  
  // Reset scroll scrambles on mode change
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      resetScrollScrambles();
      // Re-trigger observation after mode switch
      setTimeout(() => {
        const headers = document.querySelectorAll('.content-section h1, .content-section h2, .content-section h3');
        headers.forEach(header => {
          if (header.offsetParent !== null) { // Check if visible
            // The observer will automatically re-detect them
          }
        });
      }, 300);
    });
  });
  
  // Add periodic glitch to footer quote
  HoloqVFX.AutoEffects.addPeriodicGlitch('#soul-quote', 5000, 0.1);
  
});