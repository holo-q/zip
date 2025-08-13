const HoloqMouseVFX = (function() {
  'use strict';

  const CONFIG = {
    SCRAMBLE_CHARS: '▓▒░█▄▀▌▐│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌αβγδεζηθικλμνξοπρστυφχψω∞∂∇∈∉∋∌∑∏√∛∜≈≠≤≥⊕⊗⊙⊘',
    RIPPLE_SPEED: 0.2,
    RIPPLE_WIDTH: 5,
    RIPPLE_INTENSITY: 0.8, // Probability of a character being affected
    FPS: 30,
  };

  let pre, container;
  let characters = [];
  let mouse = { x: -9999, y: -9999 };
  let animationFrameId;
  let lastFrameTime = 0;
  let time = 0;
  let isSchizoMode = false;

  function init(el) {
    if (document.body.classList.contains('schizo-mode')) {
        isSchizoMode = true;
        return;
    }

    container = el;
    pre = container.querySelector('pre');
    
    const originalText = pre.textContent;
    pre.innerHTML = ''; // Clear the pre

    let x = 0;
    let y = 0;
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
      });

      if (char === '\n') {
        y++;
        x = 0;
      } else {
        x++;
      }
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    startAnimation();
  }

  function handleMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const charWidth = characters[1].span.offsetLeft - characters[0].span.offsetLeft;
    const charHeight = characters.find(c => c.y > 0)?.span.offsetTop || 15;

    mouse.x = (e.clientX - rect.left) / charWidth;
    mouse.y = (e.clientY - rect.top) / charHeight;
  }

  function handleMouseLeave() {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  function startAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  function animate(timestamp) {
    if (document.body.classList.contains('schizo-mode')) {
        if (!isSchizoMode) {
            // Mode has been switched, restore original text and stop animation
            pre.innerHTML = characters.map(c => c.originalChar).join('');
            cancelAnimationFrame(animationFrameId);
            isSchizoMode = true;
        }
        return;
    }

    const elapsed = timestamp - lastFrameTime;
    const interval = 1000 / CONFIG.FPS;

    if (elapsed > interval) {
      lastFrameTime = timestamp - (elapsed % interval);
      time += CONFIG.RIPPLE_SPEED;

      for (let i = 0; i < characters.length; i++) {
        const charData = characters[i];
        if (charData.isWhitespace) continue;

        const dx = charData.x - mouse.x;
        const dy = charData.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const rippleValue = Math.sin(dist / CONFIG.RIPPLE_WIDTH - time);

        if (rippleValue > 0.5 && Math.random() < CONFIG.RIPPLE_INTENSITY) {
          charData.span.textContent = CONFIG.SCRAMBLE_CHARS[Math.floor(Math.random() * CONFIG.SCRAMBLE_CHARS.length)];
        } else {
          charData.span.textContent = charData.originalChar;
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  return {
    init: init
  };
})();