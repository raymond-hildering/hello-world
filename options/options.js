let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#000000", "#e8453c", "#f9bb2d", "#4688f1"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

function randomColor() {
  // Hardcoded test value
  return "#757aa3";
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;
      button.style.height = "100px";
      button.style.width = "100px";

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }

    // Add random coloured button
    let randomButton = document.createElement("button");
    let randomColor = randomColor();
    randomButton.dataset.color = randomColor;
    randomButton.style.backgroundColor = randomColor;
    randomButton.style.height = "100px";
    randomButton.style.width = "100px";

    // …mark the currently selected color…
    if (randomColor === currentColor) {
      randomButton.classList.add(selectedClassName);
    }

    // …and register a listener for when that button is clicked
    randomButton.addEventListener("click", handleButtonClick);
    page.appendChild(randomButton);
  });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);