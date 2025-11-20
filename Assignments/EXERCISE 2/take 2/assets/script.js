
//  INITIAL GAME STATE
//array to represent the game board, in the beggining, all the cells will be empty
let board = ["", "", "", "", "", "", "", "", ""];

//the first player will be X (currentPlayer = initialPlayer)
let currentPlayer = "X";

//the page loads with an active game, to do this I use a boolean variable
let gameActive = false;

let playerNames = {
    X: "Player X",
    O: "Player O"
};

let scores = {
    X: 0,
    O: 0,
    tie: 0
};

let scoreboard = [];

// Winning combinations: multidimentional array of the winning patterns
const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],  //rows
    [0,3,6], [1,4,7], [2,5,8],  //columns
    [0,4,8], [2,4,6]            //diagonals
];


//  SOUND EFFECTS (uploading)
const clickSound = new Audio("Assets/DOCS/click.mp3");
const errorSound = new Audio("Assets/DOCS/error.mp3");
const winSound   = new Audio("Assets/DOCS/win.mp3");
const tieSound   = new Audio("Assets/DOCS/draw.mp3");

//  DOM ELEMENTS
const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");

// Desktop scoreboard
const playerXLabel = document.getElementById("playerXLabel");
const playerOLabel = document.getElementById("playerOLabel");
const ScoreX = document.getElementById("ScoreX");
const ScoreO = document.getElementById("ScoreO");
const ScoreTie = document.getElementById("ScoreTie");

// Mobile menu scoreboard
const playerXLabel_m = document.getElementById("playerXLabel_m");
const playerOLabel_m = document.getElementById("playerOLabel_m");
const playerXScore_m = document.getElementById("playerXScore_m");
const playerOScore_m = document.getElementById("playerOScore_m");
const tiesScore_m = document.getElementById("tiesScore_m");

// Under-board scoreboard
const ScoreX_under = document.getElementById("ScoreX_under");
const ScoreO_under = document.getElementById("ScoreO_under");
const ScoreTie_under = document.getElementById("ScoreTie_under");



//  PLAYER NAME INPUTS

//desktop
const playerXNameInput = document.getElementById("playerXName");
const playerONameInput = document.getElementById("playerOName");
const startGameBtn = document.getElementById("startGameBtn");

//mobile
const playerXNameInput_m = document.getElementById("playerXName_mobile");
const playerONameInput_m = document.getElementById("playerOName_mobile");
const startGameBtn_m = document.getElementById("startGameBtn_mobile");



//  MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});



//  GAME STATUS

function updateStatusStyle(type) {
    gameStatus.classList.remove("status-turn", "status-win", "status-draw", "status-error");
    gameStatus.classList.add(type);
}



//  START GAME (DESKTOP)

startGameBtn.addEventListener("click", () => {
    playerNames.X = playerXNameInput.value.trim() || "Player X";
    playerNames.O = playerONameInput.value.trim() || "Player O";

    playerXLabel.textContent = playerNames.X;
    playerOLabel.textContent = playerNames.O;

    playerXLabel_m.textContent = playerNames.X;
    playerOLabel_m.textContent = playerNames.O;

    initGame();
});



//  START GAME (MOBILE)

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



//  INITIALIZE GAME

//initGame (when the page loads and when the game restarts, it sets all the variables to the initial values)
function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("disabled");
    });

    gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
    updateStatusStyle("status-turn");
}



//  HANDLE CELL CLICK

cells.forEach(cell => {
    cell.addEventListener("click", () => {

        const index = cell.getAttribute("data-index");

        if (!gameActive) return;

        if (board[index] !== "") {
            errorSound.currentTime = 0;
            errorSound.play();

            gameStatus.textContent = "Cell already taken!";
            updateStatusStyle("status-error");

            setTimeout(() => {
                updateStatusStyle("status-turn");
                gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
            }, 800);

            return;
        }

        // Valid click sound
        clickSound.currentTime = 0;
        clickSound.play();

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkResult();
    });
});

function playerExists(player, scoresArray) {
    return scoresArray.find(entry => entry.player === player) == undefined ? false : true;
}

function addPlayerToScoreboard(player, scoresArray) {
    scoresArray.push({ player: player, score: 0 });
    return scoresArray;
}

function updatePlayerScore(playerName, scoresArray) {
    let currentPlayer = scoresArray.find(entry => entry.player === playerName);
    if (currentPlayer) {
        currentPlayer.score += 1;
    } else {
        console.log(`Hay un problema, no se encontró el jugador ${playerName} en el marcador.`);
    }
}


//  CHECK RESULT

function checkResult() {
    //console.log("checking for winner");
    
    let roundWon = false;

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;

        winSound.currentTime = 0;
        winSound.play();

        gameStatus.textContent = `${playerNames[currentPlayer]} wins!`;
        updateStatusStyle("status-win");

        scores[currentPlayer]++;

        if (!playerExists(playerNames[currentPlayer], scoreboard)) {
            addPlayerToScoreboard(playerNames[currentPlayer], scoreboard);
            updatePlayerScore(playerNames[currentPlayer], scoreboard);
        } else {
            updatePlayerScore(playerNames[currentPlayer], scoreboard);
        }

        let otherPlayer = currentPlayer === "X" ? "O" : "X";
        if (!playerExists(playerNames[otherPlayer], scoreboard)) {
            addPlayerToScoreboard(playerNames[otherPlayer], scoreboard);
        }

        console.log(scoreboard);

        updateScoreBoard();
        return;
    }
    // Tie condition
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

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
    updateStatusStyle("status-turn");
}


// ==========================================================
//  UPDATE SCOREBOARD
// ==========================================================
function updateScoreBoard() {
    // Desktop
    ScoreX.textContent = scores.X;
    ScoreO.textContent = scores.O;
    ScoreTie.textContent = scores.tie;

    // Mobile menu
    playerXScore_m.textContent = scores.X;
    playerOScore_m.textContent = scores.O;
    tiesScore_m.textContent = scores.tie;

    // Under-board
    ScoreX_under.textContent = scores.X;
    ScoreO_under.textContent = scores.O;
    ScoreTie_under.textContent = scores.tie;
}


// ==========================================================
//  DESKTOP CONTROLS
// ==========================================================
document.getElementById("resetBtn").addEventListener("click", initGame);

document.getElementById("resetScoreBtn").addEventListener("click", () => {
    scores.X = 0;
    scores.O = 0;
    scores.tie = 0;
    scoreboard = [];
    updateScoreBoard();
});


// ==========================================================
//  MOBILE CONTROLS
// ==========================================================
document.getElementById("resetBtnMobile").addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    initGame();
});

document.getElementById("resetScoreBtnMobile").addEventListener("click", () => {
    scores.X = 0;
    scores.O = 0;
    scores.tie = 0;
    updateScoreBoard();
});
