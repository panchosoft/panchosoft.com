// Animation configuration
const ANIMATION_CONFIG = {
  // Set the default animation to use on page load (null = no animation)
  defaultAnimation: 'null',

  // Available animations in cycle order
  animations: [
    { id: null, name: 'None', description: 'No filter effect' },
    { id: 'starlight-extinction', name: 'Starlight Extinction', description: 'Turbulent displacement effect' }
  ]
};

// This function cycles through SVG filter animations on the header element when clicked.
// Click repeatedly to cycle through all available animations.
function animateHeader() {
  var h = document.querySelector("#header-svg");
  if (!h) {
    console.error("AnimateHeader: header-svg element not found.");
    return;
  }

  // Initialize with default animation
  let currentIndex = ANIMATION_CONFIG.animations.findIndex(
    anim => anim.id === ANIMATION_CONFIG.defaultAnimation
  );
  if (currentIndex === -1) currentIndex = 0;

  // Apply default animation if set
  if (ANIMATION_CONFIG.defaultAnimation) {
    h.setAttribute('filter', `url(#${ANIMATION_CONFIG.defaultAnimation})`);
  }

  // Add click event to cycle through animations
  h.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % ANIMATION_CONFIG.animations.length;
    const animation = ANIMATION_CONFIG.animations[currentIndex];

    if (animation.id === null) {
      h.removeAttribute('filter');
      console.log(`Animation: ${animation.name}`);
    } else {
      h.setAttribute('filter', `url(#${animation.id})`);
      console.log(`Animation: ${animation.name} - ${animation.description}`);
    }
  });
}

// Get current animation info (useful for debugging or UI display)
function getCurrentAnimation() {
  const h = document.querySelector("#header-svg");
  if (!h) return null;

  const filter = h.getAttribute('filter');
  if (!filter) return ANIMATION_CONFIG.animations[0];

  const animId = filter.match(/#([^)]+)/)?.[1];
  return ANIMATION_CONFIG.animations.find(anim => anim.id === animId) || null;
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
// Supports both legacy seconds parameter and new config object
function rotateText(strings, secondsOrConfig) {
  let config = {};

  // Handle legacy seconds parameter for backward compatibility
  if (typeof secondsOrConfig === "number") {
    const displayTime = secondsOrConfig * 1000;
    config = {
      ...TYPING_CONFIG,
      pauseAfterType: Math.max(1000, displayTime - 2000)
    };
  } else if (secondsOrConfig) {
    config = { ...TYPING_CONFIG, ...secondsOrConfig };
  } else {
    config = { ...TYPING_CONFIG };
  }

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
  textSpan.setAttribute("aria-live", "polite");
  container.appendChild(textSpan);

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

  function type() {
    const targetText = strings[currentIndex];

    if (!isDeleting) {
      // Typing mode
      if (charIndex < targetText.length) {
        currentText = targetText.substring(0, charIndex + 1);
        textSpan.textContent = currentText;
        charIndex++;
        setTimeout(type, config.typeSpeed + Math.random() * 50); // Add slight randomness
      } else {
        // Finished typing, pause then start deleting
        setTimeout(() => {
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
        setTimeout(type, config.deleteSpeed);
      } else {
        // Finished deleting, move to next string
        isDeleting = false;
        currentIndex = (currentIndex + 1) % strings.length;
        setTimeout(type, config.pauseAfterDelete);
      }
    }
  }

  // Start the typing effect
  type();
}

function updateYear() {
  var y = document.getElementById("year")
  if(y) y.innerHTML = new Date().getFullYear();
}

// Start scripts
rotateText(["Software Programmer", "Outer Heaven 📍🇲🇽🇺🇸"], 7);
animateHeader();
document.addEventListener("DOMContentLoaded", updateYear);