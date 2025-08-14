// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
// HOLOQ VFX ENGINE - MODULAR VFX EFFECTS
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

const HoloqVFX = (function() {
  'use strict';
  
  // ═══════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════
  
  const CONFIG = {
    // Scramble timings
    MINI_SCRAMBLE_DURATION: 300,
    FULL_SCRAMBLE_DURATION: 600,
    SCRAMBLE_FPS: 10,
    
    // Mode detection
    MODE2_CLASS: 'mode2',
    
    // Animation tracking
    activeAnimations: new Set(),
    
    // Alien character set for scrambling
    ALIEN_CHARS: '▓▒░█▄▀▌▐│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌αβγδεζηθικλμνξοπρστυφχψω∞∂∇∈∉∋∌∑∏√∛∜≈≠≤≥⊕⊗⊙⊘',
    HEADING_ALIEN_CHARS: '▓▒░█▄▀▌▐'
  };
  
  // ═══════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════
  
  function isInMode2() {
    return document.body.classList.contains(CONFIG.MODE2_CLASS);
  }
  
  function storeOriginalText(element) {
    if (!element.hasAttribute('data-text')) {
      element.setAttribute('data-text', element.textContent);
    }
  }
  
  // ═══════════════════════════════════════════════════════
  // HOLOGRAM EFFECTS
  // ═══════════════════════════════════════════════════════
  
  const Hologram = {
    // Apply hologram data attributes for CSS pseudo-elements
    prepareElement: function(element, attributeName = 'data-hologram') {
      const content = element.textContent;
      element.setAttribute(attributeName, content);
      storeOriginalText(element);
    },
    
    // Prepare all elements matching selector
    prepareAll: function(selector, attributeName = 'data-hologram') {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => this.prepareElement(el, attributeName));
    },
    
    // Initialize pyramid hologram
    initPyramid: function() {
      const pyramid = document.querySelector('.pyramid-container pre');
      if (pyramid) {
        this.prepareElement(pyramid, 'data-pyramid');
      }
    },
    
    // Initialize header holograms
    initHeaders: function() {
      const headers = document.querySelectorAll('.content-section h1, .content-section h2, .content-section h3');
      headers.forEach(header => {
        this.prepareElement(header, 'data-text');
      });
    },
    
    // Initialize nav links that transform in mode 2
    initTransformLinks: function() {
      const dexLink = document.querySelector('.dex-link');
      const writerLink = document.querySelector('.writer-link');
      
      if (dexLink) {
        dexLink.setAttribute('data-original', dexLink.textContent);
        dexLink.setAttribute('data-mode2', 'DEX');
      }
      if (writerLink) {
        writerLink.setAttribute('data-original', writerLink.textContent);
        writerLink.setAttribute('data-mode2', 'WRITER');
      }
    }
  };
  
  // ═══════════════════════════════════════════════════════
  // SCRAMBLE EFFECTS
  // ═══════════════════════════════════════════════════════
  
  const Scramble = {
    // Mini scramble for quick hover effects
    mini: function(element, duration = CONFIG.MINI_SCRAMBLE_DURATION, options = {}) {
      if (CONFIG.activeAnimations.has(element)) return;
      CONFIG.activeAnimations.add(element);

      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      const textNodes = [];
      let node;
      while(node = walker.nextNode()) {
        textNodes.push(node);
      }

      const originalContents = textNodes.map(node => node.nodeValue);

      const chars = textNodes.map(node => node.nodeValue.split(''));
      const alienLen = CONFIG.ALIEN_CHARS.length;
      const frames = 5;
      let frame = 0;

      // Add visual classes
      element.classList.add('scrambling');
      if (options.addGlitch !== false) {
        element.classList.add('glitch-text');
      }

      const interval = setInterval(() => {
        const progress = frame / frames;
        textNodes.forEach((node, i) => {
          const scrambled = chars[i].map(char => {
            if (char === ' ' || char === '\n' || char === '\t') return char;
            return Math.random() < (1 - progress) ?
              CONFIG.ALIEN_CHARS[Math.floor(Math.random() * alienLen)] : char;
          });
          node.nodeValue = scrambled.join('');
        });

        frame++;
        if (frame >= frames) {
          clearInterval(interval);
          textNodes.forEach((node, i) => {
            node.nodeValue = originalContents[i];
          });
          element.classList.remove('scrambling');
          if (options.addGlitch !== false) {
            setTimeout(() => element.classList.remove('glitch-text'), 150);
          }
          CONFIG.activeAnimations.delete(element);
          if (options.onComplete) options.onComplete();
        }
      }, duration / frames);
    },
    
    // Full scramble for content transitions
    full: function(element, reverse = false, options = {}) {
      if (CONFIG.activeAnimations.has(element)) return;
      CONFIG.activeAnimations.add(element);
      
      // Get all text nodes
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        if (node.nodeValue.trim()) {
          const original = node.nodeValue;
          // If reverse, start from void
          if (reverse) {
            node.nodeValue = original.replace(/[^\s\n\t]/g, '\u00A0');
          }
          textNodes.push({
            node: node,
            original: original,
            chars: original.split('')
          });
        }
      }
      
      const duration = options.duration || CONFIG.FULL_SCRAMBLE_DURATION;
      const interval = 1000 / CONFIG.SCRAMBLE_FPS;
      const frames = duration / interval;
      let frame = 0;
      const alienChars = options.alienChars || CONFIG.ALIEN_CHARS;
      const alienLen = alienChars.length;
      
      const animateScramble = setInterval(() => {
        if (frame >= frames) {
          clearInterval(animateScramble);
          textNodes.forEach(item => {
            item.node.nodeValue = item.original;
          });
          CONFIG.activeAnimations.delete(element);
          if (options.onComplete) options.onComplete();
          return;
        }

        const progress = frame / frames;
        const easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        textNodes.forEach(item => {
          const chars = item.chars;
          const len = chars.length;
          const result = new Array(len);

          for (let i = 0; i < len; i++) {
            const char = chars[i];
            if (char === ' ' || char === '\n' || char === '\t') {
              result[i] = char;
              continue;
            }

            // Determine which character to show based on progress
            if (reverse) {
              // Scramble IN
              if (Math.random() < easedProgress) {
                result[i] = char;
              } else {
                result[i] = alienChars[Math.floor(Math.random() * alienLen)];
              }
            } else {
              // Scramble OUT
              if (Math.random() < easedProgress) {
                result[i] = alienChars[Math.floor(Math.random() * alienLen)];
              } else {
                result[i] = char;
              }
            }
          }
          item.node.nodeValue = result.join('');
        });
        
        frame++;
      }, interval);
    },
    
    // Check if element is currently scrambling
    isActive: function(element) {
      return CONFIG.activeAnimations.has(element);
    },

    h1: function(element, reverse = false, options = {}) {
      options.alienChars = CONFIG.HEADING_ALIEN_CHARS;
      this.full(element, reverse, options);
    }
  };
  
  // ═══════════════════════════════════════════════════════
  // AUTO-EFFECTS
  // ═══════════════════════════════════════════════════════
  
  const AutoEffects = {
    // Add hover scramble to elements
    addHoverScramble: function(selector, duration = CONFIG.MINI_SCRAMBLE_DURATION) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener('mouseenter', function() {
          if (isInMode2()) {
            Scramble.mini(this, duration);
          }
        });
      });
    },
    
    // Add click scramble to elements
    addClickScramble: function(selector, duration = CONFIG.MINI_SCRAMBLE_DURATION) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener('click', function() {
          if (isInMode2()) {
            Scramble.mini(this, duration);
          }
        });
      });
    },
    
    // Add periodic glitch to element
    addPeriodicGlitch: function(selector, interval = 5000, chance = 0.1) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        setInterval(() => {
          if (isInMode2() && Math.random() < chance) {
            Scramble.mini(el, 150);
          }
        }, interval);
      });
    },
    
    // Setup intersection observer for scroll-triggered scrambles
    setupScrollScramble: function(selector, options = {}) {
      const elements = document.querySelectorAll(selector);
      const scrambledElements = new Set();
      
      const observerOptions = {
        threshold: options.threshold || 0.5,
        rootMargin: options.rootMargin || '0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && isInMode2()) {
            const element = entry.target;
            if (!scrambledElements.has(element)) {
              scrambledElements.add(element);
              Scramble.mini(element, options.duration || 400);
            }
          }
        });
      }, observerOptions);
      
      elements.forEach(element => {
        observer.observe(element);
      });
      
      // Return function to reset the observer
      return function reset() {
        scrambledElements.clear();
      };
    }
  };
  
  // ═══════════════════════════════════════════════════════
  // SHOCKWAVE/SPRING-FIELD EFFECT
  // ═══════════════════════════════════════════════════════

  const Shockwave = {
    init: function(element) {
      if (element.dataset.shockwaveInitialized) return;

      const text = element.textContent;
      element.innerHTML = ''; // Clear original text

      const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.transition = 'transform 0.1s ease-out';
        element.appendChild(span);
        return {
          span: span,
          x: span.offsetLeft,
          y: span.offsetTop,
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0
        };
      });

      element.dataset.shockwaveInitialized = true;

      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        chars.forEach(char => {
          const distX = char.x - mouseX;
          const distY = char.y - mouseY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const force = Math.max(0, 1 - (dist / 100)) * 2;

          if (dist < 100) {
            const angle = Math.atan2(distY, distX);
            char.vx += Math.cos(angle) * force;
            char.vy += Math.sin(angle) * force;
          }
        });
      });

      function animate() {
        chars.forEach(char => {
          // Spring back to origin
          char.vx += (0 - char.dx) * 0.1;
          char.vy += (0 - char.dy) * 0.1;

          // Damping
          char.vx *= 0.9;
          char.vy *= 0.9;

          char.dx += char.vx;
          char.dy += char.vy;

          char.span.style.transform = `translate(${char.dx}px, ${char.dy}px)`;
        });
        requestAnimationFrame(animate);
      }
      animate();
    }
  };

  // ═══════════════════════════════════════════════════════
  // MODE MANAGEMENT
  // ═══════════════════════════════════════════════════════
  
  const Mode = {
    // Update navigation links for mode changes
    updateNavLinks: function(isMode2) {
      // Handle HOME/SRC transformation
      const homeLink = document.querySelector('.home-link');
      if (homeLink) {
        if (isMode2) {
          homeLink.textContent = homeLink.getAttribute('data-mode2-text') || 'SRC';
          homeLink.href = homeLink.getAttribute('data-mode2-href') || 'https://github.com/holo-q/zip';
        } else {
          homeLink.textContent = homeLink.getAttribute('data-mode1-text') || 'HOME';
          homeLink.href = homeLink.getAttribute('data-original-href') || '/';
        }
      }
      
      // Handle GITHUB/CONTRIBUTE! transformation
      const githubLink = document.querySelector('.github-link');
      if (githubLink) {
        if (isMode2) {
          githubLink.textContent = githubLink.getAttribute('data-mode2-text') || 'CONTRIBUTE!';
        } else {
          githubLink.textContent = githubLink.getAttribute('data-mode1-text') || 'GITHUB';
        }
      }
    },
    
    // Enter mode 2
    enterMode2: function() {
      document.body.classList.add(CONFIG.MODE2_CLASS);
      this.updateNavLinks(true);
      console.log('%c🔺 MODE 2 ACTIVATED 🔺', 
        'color: #dc143c; font-size: 16px; font-weight: bold;');
      console.log('%c∞ Alternative view loading...', 'color: #06b6d4;');
    },
    
    // Compatibility shim for old API
    enterSchizo: function() {
      this.enterMode2();
    },
    
    // Exit mode 2
    exitMode2: function() {
      document.body.classList.remove(CONFIG.MODE2_CLASS);
      this.updateNavLinks(false);
      console.log('%c◉ Mode 1 Interface Engaged', 'color: #e5e7eb;');
    },
    
    // Compatibility shim for old API
    exitSchizo: function() {
      this.exitMode2();
    },
    
    // Toggle mode
    toggle: function() {
      if (isInMode2()) {
        this.exitMode2();
      } else {
        this.enterMode2();
      }
    },
    
    // Check current mode
    isMode2: isInMode2,
    // Compatibility shim for old API
    isSchizo: isInMode2
  };
  
  // ═══════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════
  
  return {
    Hologram,
    Scramble,
    Shockwave, // <-- Expose the new module
    AutoEffects,
    Mode,
    CONFIG,
    
    // Convenience initialization
    init: function() {
      // Initialize all hologram preparations
      Hologram.initPyramid();
      Hologram.initHeaders();
      Hologram.initTransformLinks();
    }
  };
})();

// Auto-initialize on DOM ready if not explicitly prevented
if (typeof HOLOQ_VFX_NO_AUTO_INIT === 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HoloqVFX.init());
  } else {
    HoloqVFX.init();
  }
}