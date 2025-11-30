//  INITIAL GAME STATE
// ==========================================================

// board array
let board = ["", "", "", "", "", "", "", "", ""];

// first player
let currentPlayer = "X";

// game starts inactive until Start Game is pressed
let gameActive = false;

// names
let playerNames = {
    X: "Player X",
    O: "Player O"
};

// scoreboard
let scores = {
    X: 0,
    O: 0,
    tie: 0
};

let scoreboard = [];

// WIN PATTERNS
const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];


//  API IMAGES PER MATCH
// ==========================================================
let duckImage = "";
let foxImage = "";

// Fetch random images each match (preloading)
function fetchMatchImages() {
    // Duck for X

    //this first option doesn't work
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
            foxImage = "";
            console.warn("Fox API failed — fallback will be used.");
}



//  SOUND EFFECTS
// ==========================================================
const clickSound = new Audio("Assets/DOCS/click.mp3");
const duckSound = new Audio("Assets/DOCS/duck.mp3"); //X player
const foxSound = new Audio("Assets/DOCS/fox.mp3");   //Y player
const errorSound = new Audio("Assets/DOCS/error.mp3");
const winSound   = new Audio("Assets/DOCS/win.mp3");
const tieSound   = new Audio("Assets/DOCS/draw.mp3");



//  DOM ELEMENTS
// ==========================================================

const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");

// Desktop scoreboard
const playerXLabel = document.getElementById("playerXLabel");
const playerOLabel = document.getElementById("playerOLabel");
const ScoreX = document.getElementById("ScoreX");
const ScoreO = document.getElementById("ScoreO");
const ScoreTie = document.getElementById("ScoreTie");

// Mobile scoreboard
const playerXLabel_m = document.getElementById("playerXLabel_m");
const playerOLabel_m = document.getElementById("playerOLabel_m");
const playerXScore_m = document.getElementById("playerXScore_m");
const playerOScore_m = document.getElementById("playerOScore_m");
const tiesScore_m = document.getElementById("tiesScore_m");

// Under-board
const ScoreX_under = document.getElementById("ScoreX_under");
const ScoreO_under = document.getElementById("ScoreO_under");
const ScoreTie_under = document.getElementById("ScoreTie_under");

// Player inputs
const playerXNameInput = document.getElementById("playerXName");
const playerONameInput = document.getElementById("playerOName");
const startGameBtn = document.getElementById("startGameBtn");

// mobile
const playerXNameInput_m = document.getElementById("playerXName_mobile");
const playerONameInput_m = document.getElementById("playerOName_mobile");
const startGameBtn_m = document.getElementById("startGameBtn_mobile");

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});


// Rules toggle
// ========================
const rulesSection = document.getElementById("rulesSection");
const rulesBtnDesktop = document.getElementById("rulesBtnDesktop");
const rulesBtnMobile = document.getElementById("rulesBtnMobile");

// toggle rules visibility
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
function updateStatusStyle(type) {
    gameStatus.classList.remove("status-turn", "status-win", "status-draw", "status-error");
    gameStatus.classList.add(type);
}



//  START GAME BUTTONS
// ==========================================================
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
function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    
    // FETCH NEW IMAGES FOR THE MATCH
    fetchMatchImages();

    // Clear board visuals
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

        //clickSound.currentTime = 0;
        //clickSound.play();

        //update board state
        board[index] = currentPlayer;
        cell.textContent = "";

        // Apply correct image

        // I tried do add a fallback, in case the api didn't work properly, but the code kept on breaking
        if (currentPlayer === "X") {
            cell.style.backgroundImage = `url('${duckImage}')`;
            duckSound.currentTime = 0;
            duckSound.play();

        } else {
            cell.style.backgroundImage = `url('${foxImage}')`;
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
function checkResult() {

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
        }
        updatePlayerScore(playerNames[currentPlayer], scoreboard);

        updateScoreBoard();
        return;
    }

    // Tie
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

    // Switch turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
    updateStatusStyle("status-turn");
}



//  UPDATE SCOREBOARD
// ==========================================================
function updateScoreBoard() {
    // Desktop
    ScoreX.textContent = scores.X;
    ScoreO.textContent = scores.O;
    ScoreTie.textContent = scores.tie;

    // Mobile
    playerXScore_m.textContent = scores.X;
    playerOScore_m.textContent = scores.O;
    tiesScore_m.textContent = scores.tie;

    // Under board
    ScoreX_under.textContent = scores.X;
    ScoreO_under.textContent = scores.O;
    ScoreTie_under.textContent = scores.tie;
}


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
    scoreboard = [];
    updateScoreBoard();
});