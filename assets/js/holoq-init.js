// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
// HOLOQ VFX INITIALIZATION
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

document.addEventListener('DOMContentLoaded', function() {
  // Initialize VFX system
  HoloqVFX.init();
  
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
        const elementsToScramble = nextContent.querySelectorAll('.content-section h1, .content-section h2, .content-section h3, .content-section p, .content-section li');

        elementsToScramble.forEach(el => {
          if (el.tagName === 'H1') {
            HoloqVFX.Scramble.h1(el, true, { duration: 800 });
          } else {
            HoloqVFX.Scramble.full(el, true, { duration: 800 });
          }
        });
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
  
  // Add hover scramble to pyramid in mode 2
  const pyramid = document.querySelector('.pyramid-container pre');
  if (pyramid) {
    pyramid.addEventListener('mouseenter', function() {
      if (HoloqVFX.Mode.isMode2()) {
        HoloqVFX.Shockwave.init(this);
      }
    });
  }
});