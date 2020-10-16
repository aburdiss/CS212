const theGame = document.querySelector("#the-game");
const resetButton = document.querySelector("header button");

function main () {
  resetButton.addEventListener('click', resetGame);
  theGame.addEventListener('click', turnLightsOut);
  resetGame();
}

function resetGame () {
  var divs = document.querySelectorAll("#the-game > div");
  for (var i = 0; i < divs.length; i++) {
      divs[i].classList.add("out");
  }
  clickRandomLights();
  resetMoveCounter();
}

function resetMoveCounter () {
  const moveCounter = document.querySelector("#js-moves");
  moveCounter.innerHTML = 0;
}

function clickRandomLights () {
  const numberOfLightsToTurnOn = Math.floor(Math.random() * 8) + 5;
  for (var i = 0; i < numberOfLightsToTurnOn; i++) {
    const randomNumber = Math.floor(Math.random() * 25) + 1;
    toggleLight(document.querySelector(`#a${randomNumber}`));
    toggleAdjacentLights(document.querySelector(`#a${randomNumber}`));
  }
}

function turnLightsOut (event) {
  const element = getElement(event);
  if (element.id !== "the-game") {
    toggleLight(element);
    toggleAdjacentLights(element);
    updateMoveCounter();
    checkForWin();
  }
}

function updateMoveCounter () {
  const moveCounter = document.querySelector("#js-moves");
  const previousMoveCount = parseInt(moveCounter.innerHTML, 10);
  moveCounter.innerHTML = previousMoveCount + 1;
}

function getElement (event) {
  const elementID = event.target.id;
  const elementSelector = "#" + elementID;
  return document.querySelector(elementSelector);
}

function toggleLight (element) {
  element.classList.toggle("out");
}

function toggleAdjacentLights (element) {
  const targetElementID = parseInt(element.id.slice(1), 10);
  const leftLightID = targetElementID - 1;
  const rightLightID = targetElementID + 1;
  const topLightID = targetElementID - 5;
  const bottomLightID = targetElementID + 5;
  switch (targetElementID) {
    case 1:
      toggleLight(document.querySelector(`#a${rightLightID}`));
      toggleLight(document.querySelector(`#a${bottomLightID}`));
      break;
    case 2:
    case 3:
    case 4:
      toggleLight(document.querySelector(`#a${leftLightID}`));
      toggleLight(document.querySelector(`#a${rightLightID}`));
      toggleLight(document.querySelector(`#a${bottomLightID}`));
      break;
    case 5:
      toggleLight(document.querySelector(`#a${leftLightID}`));
      toggleLight(document.querySelector(`#a${bottomLightID}`));
      break;
    case 6:
    case 11:
    case 16:
      toggleLight(document.querySelector(`#a${topLightID}`));
      toggleLight(document.querySelector(`#a${rightLightID}`));
      toggleLight(document.querySelector(`#a${bottomLightID}`));
      break;
    case 7:
    case 8:
    case 9:
    case 12:
    case 13:
    case 14:
    case 17:
    case 18:
    case 19:
      toggleLight(document.querySelector(`#a${topLightID}`));
      toggleLight(document.querySelector(`#a${rightLightID}`));
      toggleLight(document.querySelector(`#a${leftLightID}`));
      toggleLight(document.querySelector(`#a${bottomLightID}`));
      break;
    case 10:
    case 15:
    case 20:
      toggleLight(document.querySelector(`#a${topLightID}`));
      toggleLight(document.querySelector(`#a${leftLightID}`));
      toggleLight(document.querySelector(`#a${bottomLightID}`));
      break;
    case 21:
      toggleLight(document.querySelector(`#a${topLightID}`));
      toggleLight(document.querySelector(`#a${rightLightID}`));
      break;
    case 22:
    case 23:
    case 24:
      toggleLight(document.querySelector(`#a${topLightID}`));
      toggleLight(document.querySelector(`#a${leftLightID}`));
      toggleLight(document.querySelector(`#a${rightLightID}`));
      break;
    case 25:
      toggleLight(document.querySelector(`#a${topLightID}`));
      toggleLight(document.querySelector(`#a${leftLightID}`));
      break;
  }
}

function checkForWin () {
  const gameBoard = document.querySelectorAll("#the-game > div");
  for (var i = 0; i < gameBoard.length; i++) {
    if (!(gameBoard[i].classList.contains("out"))) {
      return false;
    }
  }
  const newHighScore = logBestMoves();
  if (newHighScore === null) {
    window.alert("You Won!");
  } else {
    window.alert(`You Won!\nNew High Score: ${newHighScore}\nCongratulations!`);
  }
  resetGame();
}

function logBestMoves () {
  const currentBest = document.querySelector("#js-best");
  const thisGame = document.querySelector("#js-moves");
  const currentBestCount = parseInt(currentBest.innerHTML, 10);
  const thisGameCount = parseInt(thisGame.innerHTML, 10);
  if (thisGameCount < currentBestCount) {
    currentBest.innerHTML = thisGameCount;
    return thisGameCount;
  } else if (currentBestCount === 0) {
    currentBest.innerHTML = thisGameCount;
    return thisGameCount;
  }
  return null;
}

main();
