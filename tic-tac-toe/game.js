const boardElement = document.querySelector("#board");
const statusText = document.querySelector("#status");
let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];




function createBoard(){
    boardElement.innerHTML = "";
    board.forEach((x,i) => {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.onclick = handleMove;
        boardElement.appendChild(cell);
    });
}

function handleMove(e){
    const index = e.target.dataset.index;
    if(board[index] !== "" || !gameActive){
        return;
    }

    makeMove(index, currentPlayer);

    if(checkWinner(currentPlayer)){
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if(board.every(cell => cell !== "")){
        statusText.textContent = `Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer=== "X" ? "O" : "X";
    if(document.getElementById("mode").value === "ai" && currentPlayer === "O"){
        aiMove();
    }
}

function makeMove(index, player){
    board[index] = player;
    boardElement.children[index].textContent=player;
}
function checkWinner(player){
    if(winPatterns.some(pattern => pattern.every(i => board[i] === player))){
        return true;
    }
    return false;
}
function aiMove(){}
function randomMove(){}
function mediumMove(){}
function hardMove(){}


createBoard();