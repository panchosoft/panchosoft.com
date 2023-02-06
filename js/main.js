// This function is used to toggle the filter attribute on the #header-svg element when clicked.
function animateHeader() {
  var h = document.querySelector("#header-svg");
  if (h) {
    h.addEventListener('click', () => {
      if (h.hasAttribute('filter'))
        h.removeAttribute('filter');
      else
        h.setAttribute('filter', 'url(#starlight-extinction)');
    });
  } else {
    console.error("AnimateHeader: header-svg element not found.");
  }
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
rotateText(["Software Programmer", "Culiac&aacute;n Sinaloa 🇲🇽"], 7);
animateHeader();
document.addEventListener("DOMContentLoaded", updateYear);