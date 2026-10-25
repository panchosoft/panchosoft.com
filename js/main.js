// Animation configuration
const ANIMATION_CONFIG = {
  // Set the default animation to use on page load (null = no animation)
  defaultAnimation: null,

  // Available animations in cycle order
  animations: [
    { id: null, name: 'None', description: 'No filter effect' },
    { id: 'starlight-extinction', name: 'Starlight Extinction', description: 'Turbulent displacement effect' }
  ]
};

// This function cycles through SVG filter animations on the header element when clicked.
// Click repeatedly to cycle through all available animations.
function animateHeader() {
  const h = document.querySelector("#header-svg");
  if (!h) {
    console.error("AnimateHeader: header-svg element not found.");
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Initialize with default animation
  let currentIndex = ANIMATION_CONFIG.animations.findIndex(
    anim => anim.id === ANIMATION_CONFIG.defaultAnimation
  );
  if (currentIndex === -1) currentIndex = 0;

  // Apply default animation if set
  if (!reducedMotion.matches && ANIMATION_CONFIG.defaultAnimation) {
    h.setAttribute('filter', `url(#${ANIMATION_CONFIG.defaultAnimation})`);
  }

  const updateAnimationControl = () => {
    if (reducedMotion.matches) {
      h.removeAttribute('filter');
      h.setAttribute('role', 'img');
      h.setAttribute('aria-label', 'Panchosoft logo');
      h.setAttribute('tabindex', '-1');
      h.style.pointerEvents = 'none';
    } else {
      h.setAttribute('role', 'button');
      h.setAttribute('aria-label', 'Cycle through header animations');
      h.setAttribute('tabindex', '0');
      h.style.pointerEvents = '';
    }
  };
  updateAnimationControl();
  reducedMotion.addEventListener('change', updateAnimationControl);

  // Function to cycle to next animation
  const cycleAnimation = () => {
    if (reducedMotion.matches) return;

    currentIndex = (currentIndex + 1) % ANIMATION_CONFIG.animations.length;
    const animation = ANIMATION_CONFIG.animations[currentIndex];

    if (animation.id === null) {
      h.removeAttribute('filter');
    } else {
      h.setAttribute('filter', `url(#${animation.id})`);
    }
  };

  // Add click event to cycle through animations
  h.addEventListener('click', cycleAnimation);

  // Add keyboard support (Enter and Space keys)
  h.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent page scroll on Space
      cycleAnimation();
    }
  });

  // Improve touch handling for mobile devices
  // Use touch-action CSS property and prevent double-tap zoom
  h.style.touchAction = 'manipulation';

  // Add touch feedback
  const touchFeedbackOpacity = getComputedStyle(document.documentElement)
    .getPropertyValue('--touch-feedback-opacity').trim();
  h.addEventListener('touchstart', () => {
    // Passive touch listener for better scroll performance
    h.style.opacity = touchFeedbackOpacity;
  }, { passive: true });

  h.addEventListener('touchend', () => {
    h.style.opacity = '1';
  }, { passive: true });
}

// Typing effect configuration
const TYPING_CONFIG = {
  typeSpeed: 80,        // Milliseconds per character when typing
  deleteSpeed: 40,      // Milliseconds per character when deleting
  pauseAfterType: 2000, // Pause after finishing typing (ms)
  pauseAfterDelete: 500, // Pause after finishing deleting (ms)
  cursorBlink: true     // Show blinking cursor
};

// Enhanced typewriter effect with character-by-character typing and deleting
// Options override TYPING_CONFIG
function rotateText(strings, options) {
  const config = { ...TYPING_CONFIG, ...options };

  const container = document.getElementById("typewriter");

  if (!container) {
    console.error("The container element with id 'typewriter' could not be found.");
    return;
  }

  if (!strings || !strings.length) {
    console.error("No strings were provided to rotate.");
    return;
  }

  // Create text span and cursor
  const textSpan = document.createElement("span");
  textSpan.setAttribute("id", "rotatingText");
  container.appendChild(textSpan);

  const announcement = document.createElement("span");
  announcement.className = "visually-hidden";
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  container.appendChild(announcement);

  // Reduced motion: show the first string as static text, no typing or cursor
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    textSpan.textContent = strings[0];
    announcement.textContent = strings[0];
    return;
  }

  if (config.cursorBlink) {
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.setAttribute("aria-hidden", "true");
    container.appendChild(cursor);
  }

  let currentIndex = 0;
  let currentText = "";
  let isDeleting = false;
  let charIndex = 0;
  let timerId = null;
  let pendingStep = null;

  // Schedules the next step and remembers it so it can be resumed after a pause
  function schedule(step, delay) {
    pendingStep = step;
    timerId = setTimeout(step, delay);
  }

  function type() {
    const targetText = strings[currentIndex];

    if (!isDeleting) {
      // Typing mode
      if (charIndex < targetText.length) {
        currentText = targetText.substring(0, charIndex + 1);
        textSpan.textContent = currentText;
        charIndex++;
        schedule(type, config.typeSpeed + Math.random() * 50); // Add slight randomness
      } else {
        announcement.textContent = targetText;
        // Finished typing, pause then start deleting
        schedule(() => {
          isDeleting = true;
          type();
        }, config.pauseAfterType);
      }
    } else {
      // Deleting mode
      if (charIndex > 0) {
        currentText = targetText.substring(0, charIndex - 1);
        textSpan.textContent = currentText;
        charIndex--;
        schedule(type, config.deleteSpeed);
      } else {
        // Finished deleting, move to next string
        isDeleting = false;
        currentIndex = (currentIndex + 1) % strings.length;
        schedule(type, config.pauseAfterDelete);
      }
    }
  }

  // Pause while the tab is hidden and resume where it left off when visible again
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimeout(timerId);
      timerId = null;
    } else if (timerId === null && pendingStep) {
      schedule(pendingStep, 0);
    }
  });

  // Start the typing effect
  type();
}

function updateYear() {
  var y = document.getElementById("year")
  if(y) y.textContent = new Date().getFullYear();
}

// Assigns a --stagger-index custom property to each child of the given
// selectors so their CSS entrance animations cascade in document order.
function applyStaggerIndices(selectors) {
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.style.setProperty('--stagger-index', index);
    });
  });
}

// On desktop widths, when the stacked profile (picture above text) makes the page
// taller than the viewport, put the picture to the left of the text to save height.
// Always measured in the stacked state, so the layout can't flip back and forth.
function initCompactProfile() {
  const profile = document.querySelector(".profile");
  const footer = document.querySelector("footer");
  if (!profile || !footer) return;

  const desktop = window.matchMedia("(min-width: 601px)");

  const update = () => {
    profile.classList.remove("profile-inline");
    // offsetTop/offsetHeight ignore the entrance animation's transforms
    const pageHeight = footer.offsetTop + footer.offsetHeight;
    if (desktop.matches && pageHeight > window.innerHeight) {
      profile.classList.add("profile-inline");
    }
  };

  update();
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
}

// Start scripts
rotateText(["Software Programmer", "Outer Heaven 📍🇲🇽🇺🇸"], { pauseAfterType: 5000 });
animateHeader();
initCompactProfile();
applyStaggerIndices([".social-list > li", ".main-list > li"]);
document.addEventListener("DOMContentLoaded", updateYear);