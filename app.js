"use strict";

let deck = {};
let drawnCard;
let higher;
let lower;

const cardDiv = document.getElementById("cardDiv");
const highOrLow = document.querySelector(".higherOrLower");
const drawCardButt = document.getElementById("drawCard");
const high = document.querySelector(".higher");
const low = document.querySelector(".lower");
const player = document.querySelector(".player");
const playerW = document.querySelector("#playerWin");
const playerL = document.querySelector("#playerLose");
const playerD = document.querySelector("#playerDraw");
const restart = document.querySelector(".restart");

//hämta API
async function getDeck() {
  const res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await res.json();
  deck = data;
  console.log(deck);
}
getDeck();

//dra kort
drawCardButt.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  //visa kort och dölj start knappen
  drawCardButt.classList.add("hide");
  highOrLow.classList.remove("hide");
  high.classList.remove("hide");
  low.classList.remove("hide");
  const data = await res.json();
  getValue(data);
  drawnCard = data.cards[0].value;
  const cardImg = document.createElement("img");
  const cardNum = document.createElement("h1");
  cardNum.innerText = data.cards[0].value;
  cardImg.src = data.cards[0].image;
  cardImg.alt = data.cards[0].value;
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardNum);
  console.log(data.cards[0]);
  console.log(drawnCard);
});

high.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  const data = await res.json();

  const cardImg = document.createElement("img");
  const cardNum = document.createElement("h1");
  cardImg.src = data.cards[0].image;
  cardImg.alt = data.cards[0].value;
  getValue(data);
  higher = data.cards[0].value;
  cardNum.innerText = data.cards[0].value;
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardNum);
  winner(drawnCard, higher, player, playerL, playerD, playerW);
  console.log(data.cards[0]);
  console.log(higher);
  high.classList.add("hide");
  low.classList.add("hide");
});

low.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  const data = await res.json();

  const cardImg = document.createElement("img");
  const cardNum = document.createElement("h1");
  cardImg.src = data.cards[0].image;
  cardImg.alt = data.cards[0].value;
  getValue(data);
  lower = data.cards[0].value;
  cardNum.innerText = data.cards[0].value;
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardNum);
  winner(lower, drawnCard, player, playerL, playerD, playerW);
  console.log(data.cards[0]);
  console.log(lower);
  high.classList.add("hide");
  low.classList.add("hide");
});

restart.addEventListener("click", function () {
  drawCardButt.classList.remove("hide");
  high.classList.add("hide");
  low.classList.add("hide");
  cardDiv.innerHTML = "";
  playerW.classList.add("hide");
  playerD.classList.add("hide");
  playerL.classList.add("hide");
  player.classList.remove("hide");
});

//omvandla sträng till nummer
function getValue(data) {
  switch (data.cards[0].value) {
    case "JACK":
      data.cards[0].value = 11;
      break;
    case "QUEEN":
      data.cards[0].value = 12;
      break;
    case "KING":
      data.cards[0].value = 13;
      break;
    case "ACE":
      data.cards[0].value = 1;
    default:
      data.cards[0].value = Number(data.cards[0].value);
  }
}

//visa vinnare el förlorare
function winner(number1, number2, player1, player2, player3, player4) {
  if (number1 > number2) {
    player1.classList.add("hide");
    player2.classList.remove("hide");
  } else if (number1 === number2) {
    player1.classList.add("hide");
    player3.classList.remove("hide");
  } else if (number1 < number2) {
    player1.classList.add("hide");
    player4.classList.remove("hide");
  }
}
