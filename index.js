const readline = require('readline');
const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require('yargs');

const boxenOptions = {
  padding: 1,
  margin: 0.5,
  borderStyle: "single",
  borderColor: "white"
}

// const board = boxen("X",boxenOptions) + boxen("O",boxenOptions)
const game = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let winner = false;
let player = 'X';
let board = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '
};

const markSpace = (space) => {
  if (board[space] === ' ') {
    board[space] = player;
    takeTurn(space);
  } else {
    game.question(`${board[space]} is already on that space. Pick a different one (1-9): `, (answer) => {
      markSpace(answer);
    });
  }
}

const switchPlayer = () => {
  player === 'X' ? player = 'O' : player = 'X';
}

const checkWinner = (board) => {
  const winners = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
  ];
  let index = 0;

  while (index < winners.length && !winner) {
    const set = winners[index];

    const checkX = (value) => board[value] === 'X';
    const checkO = (value) => board[value] === 'O';

    const x = set.every(checkX);
    const o = set.every(checkO);

    if (x) {
      winner = 'X';
    }
    if (o) {
      winner = 'O';
    }

    index++;
  }

  return winner;
}

const logBoard = () => {
  console.log(
    '\n' +
    ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
    ' ---------\n' +
    ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
    ' ---------\n' +
    ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n'
  )
}

const takeTurn = (space) => {
  switchPlayer();
  markSpace(space);

  // Update Board
  logBoard();

  winner = checkWinner();
  console.log(winner);

  if (winner) {
    console.log(`The winner is ${player}!`)
  } else {
    game.question(`It's ${player}'s turn. Which space do you pick (1-9)? `, (answer) => {
      takeTurn(answer);
    });
  }
}

logBoard();
game.question(`It's ${player}'s turn. Which space do you pick (1-9)? `, (answer) => {
  takeTurn(answer);
});