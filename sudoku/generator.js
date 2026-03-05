function generator(dificulty){
    let board = Array.from({length : 9}, ()=> Array(9).fill(0));
    solver(board);
    let solution = board.map( e => [...e]);
    let removed = 0;

    const positions = getShuffledPositions();
    for(let i = 0; i < 81; i++){
        if(removed === dificulty){
            break;
        }
        const [row, col] = positions[i];
        const val = board[row][col];
        board[row][col] = 0;
        let testBoard = board.map(row => [...row]);
        if(countSolutions(testBoard) !== 1){
            board[row][col] = val;
        }
        else{
            removed++;
        }
    }

    return {
        puzzle: board,
        solution: solution
    }    
}

function getShuffledPositions(){
    const positions = Array.from({length : 81}, (x,index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        return[row,col];
    });
    for(let i = positions.length-1; i >= 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [positions[i],positions[j]] = [positions[j],positions[i]];
    }
    return positions;
}


function countSolutions(board) {
    let count = 0;

    function backtrack() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            backtrack();
                            board[row][col] = 0;
                            if (count > 1) return;
                        }
                    }
                    return; 
                }
            }
        }
        count++;
    }

    backtrack();
    return count;
}