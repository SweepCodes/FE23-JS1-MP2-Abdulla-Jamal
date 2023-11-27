////////////////////////////////////////////////////
//                   Miniprojekt2                 //
//                  Sten, Sax, Påse               //
//                Av : Abdulla Jamal              //
//               Senast ändrad: 27-NOV-2023       //
////////////////////////////////////////////////////

/* Hämtar mina element från mitt html dokument och Deklarerar de som variabler i mitt Js dokument för senare användning*/
let pScore = 0;
let aiScore = 0;
const nameForm = document.querySelector("form");
const gameDiv = document.querySelector("#game-div");
const welcomeMsg = document.querySelector("#welcome-msg");
const instruction = document.querySelector("#instruction-msg");
const scoreContainer = document.querySelector("#score-container");
let playerScoreboard = document.querySelector("#player-score");
let aiScoreboard = document.querySelector("#ai-score");
const playerText = document.querySelector("#playerText");
const aiText = document.querySelector("#aiText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");
const btnContainer = document.querySelector("#choices");
const winDiv = document.querySelector("#winner-div");
const scoreboard = document.querySelector("#scoreboard");
const resetBtn = document.querySelector("#resetBtn");
const finalResult = document.querySelector("#final-result");
let playersChoice;
let aiChoice;
let nameInput;
/*Skapar en event listener till mitt name-form och Beskriver vad som kommer att hända när jag trycker på "submit" knappen */
nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  nameInput = document.querySelector("#nameInput").value;
  playerText.innerText = nameInput + ":";
  gameDiv.className = "visible";
  scoreboard.className = "visible";
  nameForm.className = "hidden";
  instruction.className = "hidden";
  playerScoreboard.innerText = ` ${nameInput} : ${pScore}`;
  btnContainer.className = "visible";
  nameForm.reset();
});
/*Gör en foreach loop som skapar event listeners åt mina sten,sax,påse knappar och sedan lägger spel-logiken i en callback function så att den körs vid varje knapp tryck */
choiceBtns.forEach((button) =>
  button.addEventListener("click", () => {
    playersChoice = button.textContent;
    aiTurn();
    playerText.textContent = `${nameInput} : ${playersChoice}`;
    aiText.textContent = `AI: ${aiChoice}`;

    const winnerResult = winnerCheck();
    resultText.textContent = winnerResult;
    aiScoreboard.innerText = `AI: ${aiScore}`;
    playerScoreboard.innerText = ` ${nameInput} : ${pScore}`;
    if (winnerResult == "You Won!") {
      pScore++;
      playerScoreboard.innerText = ` ${nameInput} : ${pScore}`;
    } else if (winnerResult == "You Lost!") {
      aiScore++;
      aiScoreboard.innerText = `AI: ${aiScore}`;
    }
    if (pScore === 3) {
      finalResult.innerText = "Congrats you won this round";
      finalResult.style.color = "green";
      scoreboard.className = "visible";
      gameOver();
    } else if (aiScore === 3) {
      finalResult.innerText = "Ai won you suck. gg";
      finalResult.style.color = "red";
      scoreboard.className = "visible";
      gameOver();
    }
  })
);
/*Funktionen för datorns tur vilket körs samtidigt som spelaren klickar på ett val */
function aiTurn() {
  const randNum = Math.floor(Math.random() * 3);
  switch (randNum) {
    case 0:
      aiChoice = "ROCK";
      break;
    case 1:
      aiChoice = "PAPER";
      break;
    case 2:
      aiChoice = "SCISSORS";
      break;
  }
}
/*Funktionen med logiken för att kolla vem som vinner  */
function winnerCheck() {
  if (playersChoice == aiChoice) {
    return "Its a Tie!!";
  } else if (aiChoice == "ROCK") {
    return playersChoice == "SCISSORS" ? "You Lost!" : "You Won!";
  } else if (aiChoice == "SCISSORS") {
    return playersChoice == "PAPER" ? "You Lost!" : "You Won!";
  } else if (aiChoice == "PAPER") {
    return playersChoice == "ROCK" ? "You Lost!" : "You Won!";
  }
}
/*Denna funktionen körs när spelaren eller datorn vinner och den säger att allt spel innehåll ska gömmas förutom vinst medelanddet och slut resultatet*/
function gameOver() {
  winDiv.className = "visible";
  gameDiv.className = "hidden";
  nameForm.className = "hidden";
  welcomeMsg.className = "hidden";
  instruction.className = "hidden";
  btnContainer.className = "hidden";
}
/*Reset knappens funktion som refreshar sidan om man trycker på den*/
resetBtn.addEventListener("click", resetResponse);
function resetResponse() {
  location.reload();
}
