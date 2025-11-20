
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


// __________________ SOUNDS

//uploading sounds
const clickSound = new Audio('Assets/DOCS/click.mp3');
const errorSound = new Audio('Assets/DOCS/error.mp3');
const drawSound = new Audio('Assets/DOCS/draw.mp3');
const winSound = new Audio('Assets/DOCS/win.mp3');

// Function to play sound
function playSound(sound) {
  sound.currentTime = 0; // Reset to start
  sound.play().catch(e => console.log('Sound play failed:', e));
}



// __________________ PLAYERS SET UP

// names
let playerNames = {
  X: 'Player X',
  O: 'Player O'
};


// __________________ MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});


// STATUS OF THE GAME
//array to represent the game board, in the beggining, all the cells will be empty
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

//player status elements
const playerSetup = document.getElementById('playerSetup');
const gameInfo = document.getElementById('gameInfo');
const startGameBtn = document.getElementById('startGameBtn');
const playerXNameInput = document.getElementById('playerXName');
const playerONameInput = document.getElementById('playerOName');
const playerXLabel = document.getElementById('playerXLabel');
const playerOLabel = document.getElementById('playerOLabel');

            //style of game status
            /*
            gameStatus.style.fontSize = '1.5rem';
            gameStatus.style.color = "pink";
            gameStatus.style.backgroundColor = "white";
            gameStatus.style.border = "3px solid purple";
            gameStatus.style.borderRadius = "10px";
            gameStatus.style.Padding = "10 px 20px";
            */
            //gameStatus.classList.add("game-status-box");

// i decided to try to add styles in a new way, by working also on the css file and creating functions on the js file

function updateStatusStyle(statusType) {
    gameStatus.classList.remove("status-turn", "status-win", "status-draw", "status-error");
    gameStatus.classList.add(statusType);
}


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


// __________________  BUTTONS

resetBtn.addEventListener('click', restartGame);
resetScoreBtn.addEventListener('click', resetScores);

// start game 
startGameBtn.addEventListener('click', () => {
  
  const nameX = playerXNameInput.value.trim() || 'Player X';
  const nameO = playerONameInput.value.trim() || 'Player O';
  
  
  playerNames.X = nameX;
  playerNames.O = nameO;
  
  
  playerXLabel.textContent = nameX;
  playerOLabel.textContent = nameO;
  
  
  playerSetup.style.display = 'none';
  
  
  gameInfo.style.display = 'block';
  
  
  initGame();
});

// reset score

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

  /*renderMessage(`Player ${currentPlayer}'s turn`);
 updateScoreBoard();
 console.log("Board reloaded:", board);*/

    updateStatusStyle("status-turn");
    renderMessage(`${playerNames[currentPlayer]}'s turn`);

 // Attach cells listeners
  if (!attachCellListeners._attached) {
    attachCellListeners();
    attachCellListeners._attached = true;
  }
}

function handleCellClick(index) {
  
  if (!gameActive) return;
  
    if (board[index] !== '') {
    playSound(errorSound);
    
   updateStatusStyle("status-error");
    renderMessage('Cell already taken, choose another');
    return;
  }

  playSound(clickSound);
  
  updateBoard(index, currentPlayer);

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }
  
  if (checkDraw()) {
    endGame('tie');
    return;
  }

  switchPlayer();
}

function updateBoard(index, player) {
  board[index] = player;
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  if (cell) {
    cell.textContent = player;
    cell.classList.add('taken', player); // class 'X' or 'O' useful for styles
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

// Switch between X and O
function switchPlayer() {
 
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
   renderMessage(`${playerNames[currentPlayer]}'s turn`);
}


function endGame(result) {
  gameActive = false;                       // usign again the same boolean variable declared at the top, this time is to stop the game
                             
  if (result === 'tie') {
    playSound(drawSound);
    updateStatusStyle("status-draw");
    renderMessage("It's a draw!");
    scores.tie++;
  } 
  
  else {
    playSound(winSound);
    updateStatusStyle("status-win");
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

  renderMessage(`Scores reset. ${playerNames[currentPlayer]}'s turn`);
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
}
