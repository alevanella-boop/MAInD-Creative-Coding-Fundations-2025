
// _________________________________________ THIS CODE DOESN'T WORK :) please ignore_________________________________________________

/*//add a listener to make sure the DOM is loaded before running the script

// I need to create an array to represent the game board, so I will use a simple array with 9 elements
let board = Array(9).fill('');
//let board = ['', '', '', '', '', '', '', '', ''];
//in the beggining all the cells will be empty

//the first player will be X (currentPlayer = initialPlayer)
let currentPlayer = 'X';

//the page loads with an active game
let gameActive = true;

let scores = {
    X: 0,
    O: 0,
    tie: 0
}

//multidimentional array of the winning patterns
//winning patterns can be: columns, rowsm diagonals
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],     //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],     //columns
    [0, 4, 8], [2, 4, 6]                //diagonals
]

//call elements from html
// DOM elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gameStatus = document.getElementById('gameStatus');

//buttons
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');

//score
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreTie = document.getElementById('scoreTie');

//EVENT HANDLERS
//adding event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = Number(cell.getAttribute("data-index"));
        handleCellClick(index);
    });
});*/

// ________________________________________________ NEW CODE ____________________________________________________

// STATUS OF THE GAME
// I need to create an array to represent the game board, so I will use a simple array with 9 elements
// in the beggining, all the cells will be empty
let board = Array(9).fill('');

//the first player will be X (currentPlayer = initialPlayer)
let currentPlayer = 'X';

//the page loads with an active game, to do this I use a boolean variable
let gameActive = true;

//declared variables of the initial scores
let scores = { 
    X: 0, 
    O: 0, 
    tie: 0 
};

//multidimentional array of the winning patterns
//winning patterns can be: columns, rows, diagonals
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],   // rows
  [0,3,6], [1,4,7], [2,5,8],   // columns
  [0,4,8], [2,4,6]             // diagonals
];

// html elements -- DOM MANIPULATION ELEMENTS
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('CurrentPlayer'); 
const gameStatus = document.getElementById('gameStatus');

const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');

const scoreX = document.getElementById('ScoreX'); 
const scoreO = document.getElementById('ScoreO');
const scoreTie = document.getElementById('ScoreTie');



//EVENT LISTENERS

//cells
function attachCellListeners() {
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const index = Number(cell.getAttribute('data-index'));
      handleCellClick(index);
    });
  });
}

// Buttons
resetBtn.addEventListener('click', restartGame);
resetScoreBtn.addEventListener('click', resetScores);


// FUNCTIONS

initGame();
//initGame (when the page loads and when the game restarts, it sets all the variables to the initial values)

function initGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;

  // Reset visual board
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'winner', 'X', 'O');
  });
  renderMessage(`Player ${currentPlayer}'s turn`);
  updateScoreBoard();
 console.log("Board reloaded:", board);

 // Attach cells listeners
  if (!attachCellListeners._attached) {
    attachCellListeners();
    attachCellListeners._attached = true;
  }
}

function handleCellClick(index) {
  if (!gameActive) return;
  if (board[index] !== '') {
    // Celda ocupada
    renderMessage('Cell already taken — choose another');
    return;
  }
  // marcar en el tablero
  updateBoard(index, currentPlayer);
  // check for winner or draw
  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }
  if (checkDraw()) {
    endGame('tie');
    return;
  }
  // switch player
  switchPlayer();
}

function updateBoard(index, player) {
  board[index] = player;
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  if (cell) {
    cell.textContent = player;
    cell.classList.add('taken', player); // clase 'X' o 'O' útil para estilos
  }
}

// check for a winner
function checkWinner() {

    console.log("checking for winner");

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {

      // show winning cells
      document.querySelector(`.cell[data-index="${a}"]`)?.classList.add('winner');
      document.querySelector(`.cell[data-index="${b}"]`)?.classList.add('winner');
      document.querySelector(`.cell[data-index="${c}"]`)?.classList.add('winner');

      return board[a]; // 'X' or 'O'
    }
  }
  return null;
}


function checkDraw() {
  return board.every(cell => cell !== '');
}


function switchPlayer() {
  // identify each player's turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  // update display
  renderMessage(`Player ${currentPlayer}'s turn`);
}


function endGame(result) {
  gameActive = false;                            // usign again the same boolean variable declared at the top, this time is to stop the game
  if (result === 'tie') {
    renderMessage("It's a draw!");
    scores.tie++;
  } 
  
  else {
    renderMessage(`Player ${result} wins!!!`);
    scores[result]++;
  }

  updateScoreBoard();
}


function restartGame() {
  initGame();
}

// Reset scores
function resetScores() {
  scores = { 
    X: 0, 
    O: 0, 
    tie: 0 
    };

  updateScoreBoard();

  renderMessage(`Scores reset. Player ${currentPlayer}'s turn`);
}

// Update score display
function updateScoreBoard() {
  if (scoreX) scoreX.textContent = scores.X;
  if (scoreO) scoreO.textContent = scores.O;
  if (scoreTie) scoreTie.textContent = scores.tie;
}

// Rendered message to players
function renderMessage(text) {
  if (gameStatus) gameStatus.textContent = text;
  if (currentPlayerDisplay) currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
}
