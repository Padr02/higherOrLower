"use strict";

let deck = {};
let cardsDiv = document.getElementById("cards");

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

//dra ett kort
const drawCardButt = document.getElementById("drawCard");
drawCardButt.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  const data = await res.json();

  console.log(data.cards[0]);
});

//visa kort
