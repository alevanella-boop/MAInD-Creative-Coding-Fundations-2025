//  INITIAL GAME STATE
// ==========================================================

// BOARD ARRAY
//===================
// The board is represented as an array of 9 strings
// Each index corresponds to a cell in the 3×3 grid
let board = ["", "", "", "", "", "", "", "", ""];

// FIRST PLAYER
//===================
// Tracks whose turn it currently is
let currentPlayer = "X";

// Game starts inactive until START GAME is pressed
// Controls whether interactions with the board are allowed
let gameActive = false;

// NAMES
//===================
// Stores the players’ names
// Replaces defaults
let playerNames = {
    X: "Player X",
    O: "Player O"
};

// SCOREBOARD
//===================
// Score tracking
let scores = {
    X: 0,
    O: 0,
    tie: 0
};

// Stores the ranking board (list of players who have played and their total wins)
// Deleted when page is refreshed
let scoreboard = [];


// WIN PATTERNS
//===================
// Array with all possible winning combinations in Tic-Tac-Toe
const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],   //Rows
    [0,3,6], [1,4,7], [2,5,8],   //Columns
    [0,4,8], [2,4,6]             //Diagonals
];



//  API IMAGES PER MATCH
// ==========================================================
// These hold the current match’s duck and fox images
// They are updated each time a new game starts
let duckImage = "";
let foxImage = "";

// Fetch/loads random images each match
function fetchMatchImages() {
    // Duck for X

 //this first option didn't work
    //fetch("https://random-d.uk/api/random")
        //.then(res => res.json())
        //.then(data => duckImage = data.url)
        //.catch(() => duckImage = "");

     //thankfully i was able to ask chatgpt to find the error and it came up with the solution
        // Duck API FIX → direct image endpoint (works with CORS)
        duckImage = `https://random-d.uk/api/randomimg?t=${Date.now()}`;

        

    // Fox for O
    fetch("https://randomfox.ca/floof/")
        .then(res => res.json())
        .then(data => 
            foxImage = data.image)
        .catch(() => foxImage = "");

        // Fallback (if the fetching fails)
            foxImage = "";
            console.warn("Fox API failed — fallback will be used.");
}



//  SOUND EFFECTS
// ==========================================================
//const clickSound = new Audio("Assets/DOCS/click.mp3");
const duckSound = new Audio("Assets/DOCS/duck.mp3"); //X player
const foxSound = new Audio("Assets/DOCS/fox.mp3");   //Y player
const errorSound = new Audio("Assets/DOCS/error.mp3");
const winSound   = new Audio("Assets/DOCS/win.mp3");
const tieSound   = new Audio("Assets/DOCS/draw.mp3");



//  DOM ELEMENTS
// ==========================================================
// All elements that the script updates (board, scores, labels, controls)

const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");

// DESKTOP SCOREBOARD
//===================
const playerXLabel = document.getElementById("playerXLabel");
const playerOLabel = document.getElementById("playerOLabel");
const ScoreX = document.getElementById("ScoreX");
const ScoreO = document.getElementById("ScoreO");
const ScoreTie = document.getElementById("ScoreTie");

// MOBILE SCOREBOARD
//===================
const playerXLabel_m = document.getElementById("playerXLabel_m");
const playerOLabel_m = document.getElementById("playerOLabel_m");
const playerXScore_m = document.getElementById("playerXScore_m");
const playerOScore_m = document.getElementById("playerOScore_m");
const tiesScore_m = document.getElementById("tiesScore_m");

// UNDER-BOARD
//===================
const ScoreX_under = document.getElementById("ScoreX_under");
const ScoreO_under = document.getElementById("ScoreO_under");
const ScoreTie_under = document.getElementById("ScoreTie_under");

// DESKTOP PLAYER NAME INPUTS
const playerXNameInput = document.getElementById("playerXName");
const playerONameInput = document.getElementById("playerOName");
const startGameBtn = document.getElementById("startGameBtn");

// MOBILE PLAYER NAME INPUTS
const playerXNameInput_m = document.getElementById("playerXName_mobile");
const playerONameInput_m = document.getElementById("playerOName_mobile");
const startGameBtn_m = document.getElementById("startGameBtn_mobile");

// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});


// RULES TOGGLE
// ========================
const rulesSection = document.getElementById("rulesSection");
const rulesBtnDesktop = document.getElementById("rulesBtnDesktop");
const rulesBtnMobile = document.getElementById("rulesBtnMobile");

// toggle rules visibility (show/hide)
function toggleRules() {
    rulesSection.classList.toggle("hidden");
}

// Desktop button
//event listener
rulesBtnDesktop.addEventListener("click", toggleRules);

// Mobile button
//event listener
rulesBtnMobile.addEventListener("click", toggleRules);



//  STATUS STYLES
// ==========================================================
// Updates CSS class of the status text to reflect game state (turn, win, draw, etc.)
function updateStatusStyle(type) {
    gameStatus.classList.remove("status-turn", "status-win", "status-draw", "status-error");
    gameStatus.classList.add(type);
}



//  START GAME BUTTONS
// ==========================================================
// When starting a game, players' custom names are read (or fallback to default)

startGameBtn.addEventListener("click", () => {
    playerNames.X = playerXNameInput.value.trim() || "Player X";
    playerNames.O = playerONameInput.value.trim() || "Player O";

    playerXLabel.textContent = playerNames.X;
    playerOLabel.textContent = playerNames.O;

    playerXLabel_m.textContent = playerNames.X;
    playerOLabel_m.textContent = playerNames.O;

    initGame();
});

startGameBtn_m.addEventListener("click", () => {
    playerNames.X = playerXNameInput_m.value.trim() || "Player X";
    playerNames.O = playerONameInput_m.value.trim() || "Player O";

    playerXLabel.textContent = playerNames.X;
    playerOLabel.textContent = playerNames.O;

    playerXLabel_m.textContent = playerNames.X;
    playerOLabel_m.textContent = playerNames.O;

    mobileMenu.classList.remove("show");
    initGame();
});



//  INIT GAME (NEW MATCH)
// ==========================================================
// Resets board state, fetches new images
// Clears the grid and sets the turn message
function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    
    // FETCH NEW IMAGES FOR THE MATCH
    fetchMatchImages();

    // Clear board visuals from the grid
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundImage = "none";
        cell.classList.remove("disabled");
    });

    gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
    updateStatusStyle("status-turn");
}



//  HANDLE CELL CLICK
// ==========================================================
// Main interaction: placing marks, playing sounds,
// updating board state, switching turns, and checking win/tie
cells.forEach(cell => {
    cell.addEventListener("click", () => {

        const index = cell.getAttribute("data-index");

        // Prevent clicks when game is over
        if (!gameActive) return;

        // play ERROR sound and WARN user if the cell is already filled
        if (board[index] !== "") {
            errorSound.currentTime = 0;
            errorSound.play();

            gameStatus.textContent = "Cell already taken!";
            updateStatusStyle("status-error");

            // after brief warning, return to turn message
            setTimeout(() => {
                updateStatusStyle("status-turn");
                gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
            }, 800);

            return;
        }

        //clickSound.currentTime = 0;
        //clickSound.play();

        //update board state
        board[index] = currentPlayer;
        cell.textContent = "";

        // Apply correct image and sound
        // I tried do add a fallback, in case the api didn't work properly, but the code kept on breaking
        if (currentPlayer === "X") {
            cell.style.backgroundImage = `url('${duckImage}')`;

            // Duck sound plays
            duckSound.currentTime = 0;
            duckSound.play();

        } else {
            cell.style.backgroundImage = `url('${foxImage}')`;

            // Fox sound plays
            foxSound.currentTime = 0;
            foxSound.play();
        }

        cell.style.backgroundSize = "cover";
        cell.style.backgroundPosition = "center";

        checkResult();
    });
});



//  SCOREBOARD HELPERS
// ==========================================================
// Supports the ranking system, tracking each player's wins

function playerExists(player, scoresArray) {
    return scoresArray.some(entry => entry.player === player);
}

function addPlayerToScoreboard(player, scoresArray) {
    scoresArray.push({ player: player, score: 0 });
}

function updatePlayerScore(playerName, scoresArray) {
    let entry = scoresArray.find(e => e.player === playerName);
    if (entry) entry.score++;
}



//  CHECK WIN / TIE
// ==========================================================
// Evaluates the board after each move to detect a win or tie
function checkResult() {

    let roundWon = false;

    // Checks all win patterns
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    // WIN HANDLING
    if (roundWon) {
        gameActive = false;

        winSound.currentTime = 0;
        winSound.play();

        gameStatus.textContent = `${playerNames[currentPlayer]} wins!`;
        updateStatusStyle("status-win");

        scores[currentPlayer]++;

        if (!playerExists(playerNames[currentPlayer], scoreboard)) {
            addPlayerToScoreboard(playerNames[currentPlayer], scoreboard);
        }
        updatePlayerScore(playerNames[currentPlayer], scoreboard);

        updateScoreBoard();
        return;
    }

    // TIE HANDLING
    if (!board.includes("")) {
        gameActive = false;

        tieSound.currentTime = 0;
        tieSound.play();

        gameStatus.textContent = "It's a draw!";
        updateStatusStyle("status-draw");

        scores.tie++;

        updateScoreBoard();
        return;
    }

    // SWITCH TURN
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
    updateStatusStyle("status-turn");
}



//  UPDATE SCOREBOARD
// ==========================================================
// Updates all score displays

function updateScoreBoard() {

    // DESKTOP
    ScoreX.textContent = scores.X;
    ScoreO.textContent = scores.O;
    ScoreTie.textContent = scores.tie;

    // MOBILE
    playerXScore_m.textContent = scores.X;
    playerOScore_m.textContent = scores.O;
    tiesScore_m.textContent = scores.tie;

    // UNUSLESS
        //ScoreX_under.textContent = scores.X;
        //ScoreO_under.textContent = scores.O;
        //ScoreTie_under.textContent = scores.tie;
}


//  DESKTOP CONTROLS
// ==========================================================
// Reset board but keep scores

document.getElementById("resetBtn").addEventListener("click", initGame);

document.getElementById("resetScoreBtn").addEventListener("click", () => {
    scores.X = 0;
    scores.O = 0;
    scores.tie = 0;
    scoreboard = [];
    updateScoreBoard();
});



//  MOBILE CONTROLS
// ==========================================================
// Reset board but keep scores

document.getElementById("resetBtnMobile").addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    initGame();
});

document.getElementById("resetScoreBtnMobile").addEventListener("click", () => {
    scores.X = 0;
    scores.O = 0;
    scores.tie = 0;
    scoreboard = [];
    updateScoreBoard();
});