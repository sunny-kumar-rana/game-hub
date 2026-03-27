const container = document.getElementById("game-container");

let currentGame = null;

const Input = { keys: {} };

window.addEventListener("keydown", e => Input.keys[e.key] = true);
window.addEventListener("keyup", e => Input.keys[e.key] = false);

const games = {
    snake: initSnake,
    sudoku: initSudoku,
    tictactoe: initTicTacToe,
    puzzle: initPuzzle
};

function loadGame(name) {
    if (currentGame && currentGame.destroy) {
        currentGame.destroy();
    }

    container.innerHTML = "";

    if (games[name]) {
        currentGame = games[name](container);
    }
}