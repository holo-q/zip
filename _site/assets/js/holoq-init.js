// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
// HOLOQ CONSCIOUSNESS INITIALIZATION
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

document.addEventListener('DOMContentLoaded', function() {
  // Initialize VFX system
  HoloqVFX.init();
  
  // MODE SWITCHING: Mode 1 (LEVEL-HEADED/professional) vs Mode 2 (REAL/schizo)
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const professionalContent = document.getElementById('professional-content');
  const consciousnessContent = document.getElementById('consciousness-content');
  
  // Setup mode toggle handlers
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.dataset.mode;
      const currentContent = document.querySelector('.content-mode.active');
      const nextContent = mode === 'professional' ? professionalContent : consciousnessContent;
      
      // Only proceed if not already on this mode
      if (currentContent === nextContent) return;
      
      // Start scrambling out current content
      HoloqVFX.Scramble.full(currentContent, false);
      
      // After 300ms, start transition
      setTimeout(() => {
        currentContent.classList.add('fading-out');
        nextContent.classList.add('fading-in');
        
        // Update active button
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update mode
        if (mode === 'professional') {
          HoloqVFX.Mode.exitSchizo();
        } else {
          HoloqVFX.Mode.enterSchizo();
        }
        
        // Start scrambling in new content
        HoloqVFX.Scramble.full(nextContent, true);
        
        // Complete transition
        setTimeout(() => {
          currentContent.classList.remove('active', 'fading-out');
          nextContent.classList.remove('fading-in');
          nextContent.classList.add('active');
        }, 300);
      }, 300);
    });
  });
  
  // Add hover scramble to navigation
  HoloqVFX.AutoEffects.addHoverScramble('.site-nav a', 200);
  
  // Add scroll-triggered scrambles to headers
  const resetScrollScrambles = HoloqVFX.AutoEffects.setupScrollScramble(
    '.consciousness-section h1, .consciousness-section h2, .consciousness-section h3',
    { duration: 400, threshold: 0.5 }
  );
  
  // Reset scroll scrambles on mode change
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      resetScrollScrambles();
      // Re-trigger observation after mode switch
      setTimeout(() => {
        const headers = document.querySelectorAll('.consciousness-section h1, .consciousness-section h2, .consciousness-section h3');
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
  
  // Add hover scramble to pyramid in schizo mode
  const pyramid = document.querySelector('.pyramid-container pre');
  if (pyramid) {
    pyramid.addEventListener('mouseenter', function() {
      if (HoloqVFX.Mode.isSchizo()) {
        HoloqVFX.Scramble.mini(this, 500);
      }
    });
    
    pyramid.addEventListener('click', function(e) {
      if (HoloqVFX.Mode.isSchizo()) {
        // Check if Q was clicked (the Q has data-x attribute)
        if (!e.target.hasAttribute('data-x')) {
          HoloqVFX.Scramble.mini(this, 500);
        }
      }
    });
  }
});