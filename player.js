const newPlayerBtn = document.getElementById("newPlayer");
const newPlayerName = document.getElementById("newPlayerName");
const addPlayer = document.getElementById("addPlayer");
const cancelNewPlayer = document.getElementById("cancelNewPlayer");
const addPlayerModal = document.getElementById("addPlayerModal");
const playersFullModal = document.getElementById("playersFullModal");
const fullPlayersButton = document.getElementById("fullPlayersButton");
const scoreCardFront = document.getElementById("scoreCardFront");
const scoreCardBack = document.getElementById("scoreCardBack");
const overlay = document.getElementById("overlay");

let players = [];

function newPlayer(name) {
  let newPlayerId = `player${players.length}`;
  let newPlayerFront = `${newPlayerId}Front`;
  let newPlayerBack = `${newPlayerId}Back`;
  let frontElement = document.getElementById(newPlayerFront);
  let backElement = document.getElementById(newPlayerBack);
  frontElement.className = "row-md d-flex flex-column flex-md-row";
  backElement.className = "row-md d-flex flex-column flex-md-row";
  frontElement.querySelector(".col-md-2").textContent = name;
  backElement.querySelector(".col-md-2").textContent = name;
}

newPlayerBtn.addEventListener("click", () => {
  if (players.length === 4) {
    playersFullModal.className = "active-display";
  } else {
    addPlayerModal.className = "active-display";
    newPlayerName.focus();
  }
  overlay.className = "active-overlay";
});

addPlayer.addEventListener("click", () => {
  let name = newPlayerName.value;
  if (name === "") {
    return;
  }
  players.push(name);
  newPlayer(name);
  addPlayerModal.className = "no-display";
  newPlayerName.value = "";
  newPlayerName.blur();
  overlay.className = "hide-overlay";
});

newPlayerName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addPlayer.click();
  }
});

cancelPlayer.addEventListener("click", () => {
  addPlayerModal.className = "no-display";
  newPlayerName.value = "";
  newPlayerName.blur();
  overlay.className = "hide-overlay";
});

fullPlayersButton.addEventListener("click", () => {
  playersFullModal.className = "no-display";
  overlay.className = "hide-overlay";
});
