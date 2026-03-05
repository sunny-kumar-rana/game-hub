function shuffle(){
    let validValues = [1,2,3,4,5,6,7,8,9];
    for(let i = validValues.length-1; i >= 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [validValues[i], validValues[j]] = [validValues[j], validValues[i]];
    }
    return validValues;
}

function solver(board){
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            if(board[row][col] === 0){
                const nums = shuffle();
                for(let num of nums){
                    if(isValid(board, row, col, num)){
                        board[row][col] = num;
                        if(solver(board)){
                            return true;
                        }else{
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}