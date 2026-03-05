const board = document.querySelector(".board");
let ogTileList = [1,2,3,4,5,6,7,8,0];
let tileList = [1,2,3,4,5,6,7,8,0];
let random = 0;
let currentScore = 10000;
const imageList = [
    "https://images.pexels.com/photos/3876855/pexels-photo-3876855.jpeg"
    ,
    "https://images.pexels.com/photos/590497/pexels-photo-590497.jpeg"    
    ,
    "https://images.pexels.com/photos/3999194/pexels-photo-3999194.jpeg"
    ,
    "https://images.pexels.com/photos/12728679/pexels-photo-12728679.jpeg"
    ,
    "https://images.pexels.com/photos/15592875/pexels-photo-15592875.jpeg"
];

function render(){
    board.innerHTML = "";
    tileList.forEach((tileNo, index) => {
        let tile = document.createElement("div");
        tile.dataset.index = index;
        if(tileNo !== 0){
            tile.classList.add("tile");
            
            let posX = ((tileNo-1)%3) * 50;
            let posY = Math.floor((tileNo-1)/3) * 50;
            
            tile.style.backgroundImage =`url('${imageList[random]}')`;
            tile.style.backgroundSize = "300% 300%";
            tile.style.backgroundPosition = `${posX}% ${posY}%`;
        }else{
            tile.classList.add("empty");
        }
        board.appendChild(tile);
    });
}
const overlay = document.querySelector(".overlay");
const button = document.querySelector(".start");
const timer = document.querySelector("#time-elapsed");
const score = document.querySelector("#score");


button.addEventListener("click",() => {
    overlay.style.display = "none";
    random = Math.abs(Math.floor(Math.random()*10 - 4));
    play();
    let min = 4;
    let sec = 60
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
});

board.addEventListener("click", (e) => {

    if (!e.target.classList.contains("tile")){
        return;
    }

    const clickedIndex = Number(e.target.dataset.index);
    const emptyIndex = tileList.indexOf(0);

    if (isAdjacent(clickedIndex, emptyIndex)) {
        swap(clickedIndex, emptyIndex);
        render();
        currentScore = currentScore-10;
        score.textContent = currentScore;
    }

});

function isAdjacent(i1, i2){
    let row1 = Math.floor(i1/3);
    let column1 = i1%3;

    let row2 = Math.floor(i2/3);
    let column2 = i2%3;

    if(row1 === row2 && Math.abs(column1 - column2) === 1 || Math.abs(row1 - row2) === 1 && column1 === column2){
        return true;
    }
    return false;
}

function swap(i1, i2){
    let temp = tileList[i1];
    tileList[i1] = tileList[i2];
    tileList[i2] = temp;
}

function shuffle(tilesArray){
    for(let i = tilesArray.length-1; i > 0; i--){
        let random = Math.floor(Math.random()*9);
        [tilesArray[i], tilesArray[random]] = [tilesArray[random], tilesArray[i]];
    }
    return tilesArray;
}

function play(){
    tileList = shuffle(tileList);
    render();
}
