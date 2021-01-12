console.log('test')
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
  board[space] = player;
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

  markSpace(space);

  // Update Board
  logBoard();

  // Switch Player
  player === 'X' ? player = 'O' : player = 'X';
  // console.log(`It's ${player}'s Turn. Which space do you pick (1-9)?`)

  game.question(`It's ${player}'s turn. Which space do you pick (1-9)?`, (answer) => {
    takeTurn(answer);
  });
}

logBoard();
game.question(`It's ${player}'s turn. Which space do you pick (1-9)? `, (answer) => {
  takeTurn(answer);
});