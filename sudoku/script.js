const overlay = document.querySelector(".overlay");
const start = document.querySelector("form");
const outerGrid = document.querySelector(".outer-grid");
const timer = document.querySelector("#time-elapsed");
const replay = document.querySelector(".newgame");
let level = 0;
min = 6;
sec = 59;
let board = Array.from({length : 9}, () => Array(9).fill(0));
function render(board) {
    outerGrid.innerHTML = "";
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;
            outerGrid.appendChild(cell);
            if(board[row][col] !== 0){
                cell.classList.add("fixed");
                cell.textContent = board[row][col];
            }
            if (col % 3 === 0) cell.classList.add("left-border");
            if (col === 8) cell.classList.add("right-border");
            if (row % 3 === 0) cell.classList.add("top-border");
            if (row === 8) cell.classList.add("bottom-border");
        }
    }
}


let selectedCell = null;
outerGrid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell")){
        return;
    }
    if(e.target.classList.contains("fixed")){
        return;
    }
    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }

    selectedCell = e.target;
    selectedCell.classList.add("selected");
});

document.addEventListener("keydown",(element) => {
    if(!selectedCell){
        return;
    }
    const key = element.key;
    if(key >= "1" && key <= "9"){
        const row = +selectedCell.dataset.row;
        const col = +selectedCell.dataset.col;
        const previous = board[row][col];
        board[row][col] = 0;
        const num = Number(key);
        if(isValid(board, row, col, num)){
            board[row][col] = num;
            selectedCell.textContent = num;
        }else{
            board[row][col] = previous;
            selectedCell.classList.add("invalid");
            const cell = selectedCell;
            setTimeout(() => {
                cell.classList.remove("invalid");
            }, 300);
        }
    }else if(key === "Backspace" || key === "Delete"){
        const row = +selectedCell.dataset.row;
        const col = +selectedCell.dataset.col;

        board[row][col] = 0;
        selectedCell.textContent = "";
    }
});

function isValid(board, row, col, num){
    for(let i = 0; i < 9; i++){
        if(board[row][i] === num || board[i][col] === num){
            return false;
        }
    }
    let startRow = Math.floor(row/3)*3;
    let startCol = Math.floor(col/3)*3;

    for(let i = startRow; i<= startRow+2; i++){
        for(let j = startCol; j <= startCol+2; j++){
            if(board[i][j] === num){
                return false;
            }
        }
    }
    return true;
}
function difficultyLevel(level){
    if(level === "easy"){
        return Math.floor(Math.random() * (35 -30) + 1) + 30;
    }
    else if(level === "medium"){
        return Math.floor(Math.random() * (45 -40) + 1) + 40;
    }
    else if(level === "hard"){
        return Math.floor(Math.random() * (60 -50) + 1) + 50;
    }
    return 40;
}
start.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(start);
    const mode = data.get("difficulty");
    level = difficultyLevel(mode);

    play(level);
    overlay.classList.add("hide");
    console.log(mode,level);
})
replay.addEventListener("click",()=>{
    overlay.classList.remove("hide");
})

function play(level){
    let copy = board.map(row => [...row]);
    let puzzle = generator(level);
    board = puzzle.puzzle;
    render(puzzle.puzzle);

    timeCount = setInterval(()=>{
        if(min === 0 && sec === 0){
            overlay.style.display = "flex";
            clearInterval(timeCount);
            currentScore = 10000;
        }else if(sec === 0){
            min--;
            sec = 60;
        }
        sec--;
        timer.textContent = `min:${min} sec:${sec}`;
    },1000);
}
