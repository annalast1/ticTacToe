// set the game up
const Setup = {
    // board
    board() {
        return board = Array(9).fill(0); 
    },
    // valid move
    addToken(board, index, value)  {
        if (board[index] == 0 ) {
            board[index] = value;
        } else {
            console.log("Choose an empty square");
        }
    }
};

const playerController = (function () {
    const players =  [
        {
            name: 'Player One',
            token: 1
        }, 
        {
            name: 'Player Two',
            token: 20
        }
    ];
    
    let activePlayer = {};

    firstMove = () => {
        first = Math.floor(Math.random() * 2);
        return activePlayer = players[first];
    } 

    takeTurns = () => {
        activePlayer = activePlayer === players[0] ?  players[1] : players[0];
        return activePlayer;
    };

    return {activePlayer, players, firstMove, takeTurns}
})();

const results = (function () {
    checkWin = () => {
        let combo = [
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]],
            [board[1], board[4], board[7]],
            [board[0], board[3], board[6]],
            [board[1], board[4], board[7]],
            [board[2], board[5], board[8]]
        ]
    
        for (let i = 0; i < combo.length; i++) {
            if (combo[i][0] == 1 && combo[i][1] == 1 && combo[i][2] == 1) {
                console.log("Player 1 wins");
                return result = true;
            } else if (combo[i][0] == 20 && combo[i][1] == 20 && combo[i][2] == 20) {
                console.log("Player 2 wins");
                return result = true;
            } else {
                console.log("no");
                return result = false;
            }
        }
    },
    checkSpace = (board => {
        if (board.includes(0)) {
            console.log('true');
        } else {
            console.log('false');
        }
    })
    return {checkSpace, checkWin};
})();

function playGame() {
    // set up game
    let board = Setup.board();   
    let activePlayer = playerController.firstMove();
    let value = activePlayer.token;
    let result = false;  
    let space = true;

    while (!result && space) {

    }
}

const display = {
    
} 

playGame();


