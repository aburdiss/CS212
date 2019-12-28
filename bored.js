const goButton = document.querySelector("#go");
const selectBox = document.querySelector("#specific-select");
const suggestionBox = document.querySelector(".suggestion");
const nopeButton = document.querySelector("#next");
const yesButton = document.querySelector("#this-one");
const body = document.querySelector("body");
const mainElement = document.querySelector("main");

function main () {
  goButton.addEventListener("click", searchForResults);
  selectBox.addEventListener("change", searchForResults);
  nopeButton.addEventListener("click", searchForResults);
  yesButton.addEventListener("click", showAnimation);
}

function searchForResults () {
  if (selectBox.selectedOptions[0].value === "not-selected") {
    fetch("http://www.boredapi.com/api/activity/")
    .then((response) => response.json())
    .then((json) => {
      addResultsToPage(json.activity);
    });
  } else {
    fetch(`http://www.boredapi.com/api/activity?type=${selectBox.selectedOptions[0].value}`)
    .then((response) => response.json())
    .then((json) => {
      addResultsToPage(json.activity);
    });
  }
}

function showAnimation () {
  mainElement.style.display = "none";
  const finalActivity = document.createElement("div");
  const text = document.querySelector(".suggestion p");
  finalActivity.innerText = text.innerText;
  body.appendChild(finalActivity);
  finalActivity.className += "textdiv";
}

function addResultsToPage (activity) {
  while (suggestionBox.hasChildNodes() === true) {
    suggestionBox.firstChild.remove();
  }
  const newWords = document.createElement("p");
  suggestionBox.appendChild(newWords);
  newWords.innerText = activity;
}

main();
