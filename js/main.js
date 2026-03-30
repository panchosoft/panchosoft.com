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

// This function is used to rotate an array of strings in the element with id 'typewriter'
// every given number of seconds. 
function rotateText(strings, seconds) {
  var i = 0;
  var container = document.getElementById("typewriter");

  if (!container) {
    console.error("The container element with id 'typewriter' could not be found.");
    return;
  }

  if (!strings || !strings.length) {
    console.error("No strings were provided to rotate.");
    return;
  }

  if (!seconds || typeof seconds !== "number") {
    console.error("Invalid value provided for seconds. Please provide a number.");
    return;
  }

  var element = document.createElement("span");
  element.innerHTML = strings[i];
  element.setAttribute("id", "rotatingText");
  container.appendChild(element);
  i = (i + 1) % strings.length;

  setInterval(function () {
    var newElement = document.createElement("span");
    newElement.innerHTML = strings[i];
    newElement.setAttribute("id", "rotatingText");
    container.replaceChild(newElement, element);
    element = newElement;
    i = (i + 1) % strings.length;
  }, seconds * 1000);
}

function updateYear() {
  var y = document.getElementById("year")
  if(y) y.innerHTML = new Date().getFullYear();
}

// Start scripts
rotateText(["Software Programmer", "Outer Heaven 📍🇲🇽🇺🇸"], 7);
animateHeader();
document.addEventListener("DOMContentLoaded", updateYear);