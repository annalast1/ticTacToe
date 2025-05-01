// set the game up
const Setup = {
    // board
    board() {
        return board = Array(9).fill(0); 
    },
    // valid move
    addToken(board, cell, symbol)  {
        if (board[cell] == 0 ) {
            board[cell] = symbol;
        }
    }
};

const playerController = (function () {
    const players =  [
        {
            name: 'Player One',
            token: 1,
            image: './icons/x.png'
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
        combo.forEach(line => {
            for (let i = 0; i < combo.length; i++) {
                if (combo[i][0] == 1 && combo[i][1] == 1 && combo[i][2] == 1) {
                    winText(playerController.players[0].name);
                    console.log(1);
                    return;
                } else if (combo[i][0] == 20 && combo[i][1] == 20 && combo[i][2] == 20) {
                    winText(playerController.players[1].name);
                    console.log();
                    return;
                } else {
                    continue;
                }
            }
        })
    },

    checkSpace = (board => {
        if (board.includes(0)) {
            return true;
        } else {
            return false;
        }
    }),

    winText = (winner) => {
        const winMsg = document.getElementById("win-msg");
        winMsg.classList.add("show");

        const winMsgText = document.getElementById("win-msg-text");        
        winMsgText.innerText = winner + " wins!";
    }

    drawText = () => {
        const winMsg = document.getElementById("win-msg");
        winMsg.classList.add("show");

        const winMsgText = document.getElementById("win-msg-text");        
        winMsgText.innerText = "It's a draw!";
    }
    return {checkSpace, checkWin, winText, drawText};
})();



const display = (function () {
    let board = Setup.board();
    
    let activePlayer = playerController.firstMove();
    let symbol = activePlayer.token;

    const square = document.querySelectorAll(".square");
    square.value = board;
    let i = 0;
    square.forEach(cell => {
        cell.value = board[i];
        cell.dataset.index = i;
        i++;
        cell.addEventListener("click", () => {
            addMark(cell, activePlayer, {once:true});
        });  
    })          


    function addMark(cell, activePlayer) {
        
        Setup.addToken(board, cell.dataset.index, symbol);
        results.checkWin(board);
        if (!results.checkSpace(board)) {
            results.drawText();
        }
        console.log(board);
        activePlayer = playerController.takeTurns(activePlayer);
        symbol = activePlayer.token;       
        
    } 
})();


// not allowed pointer not showing
// add x or circle classlist
// form for players to enter name
