// I need to create an array to represent the game board, so I will use a simple array with 9 elements
let board = Array(9.fill(' '));
//let board = ['', '', '', '', '', '', '', '', ''];
//in the beggining all the cells will be empty

//the first player will be X (currentPlayer = initialPlayer)
let currentPlayer = 'X';

//the page loads with an active game
let gameActive = true;

let scores = {
    X: 0,
    O: 0;
    tie: 0
}

//multidimentional array of the winning patterns
//winning patterns can be: columns, rowsm diagonals
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8]     //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8]     //columns
    [0, 4, 8], [2, 4, 6]                //diagonals
]

