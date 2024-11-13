'use strict';

const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
const rolls = 200;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const randomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

btnRoll.addEventListener('click', function () {
  if (scores[activePlayer] >= rolls) {
    return;
  }
  const diceNumber = randomNumber();
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceNumber}.png`;
  if (diceNumber !== 1) {
    currentScore += diceNumber;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (scores[activePlayer] >= rolls) {
    return;
  }
  diceEl.classList.add('hidden');
  scores[activePlayer] += currentScore;
  console.log(currentScore);
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= rolls) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document.querySelector(`#name--${activePlayer}`).textContent = 'WINNER!!';
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  document.querySelector('#name--0').textContent = 'PLAYER 1';
  document.querySelector('#name--1').textContent = 'PLAYER 2';
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  current0El.textContent = 0;
  current1El.textContent = 0;
});
