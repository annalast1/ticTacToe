"use strict";
// set the game up
const Setup = {
    // board
    board() {
        let board = Array(9).fill(0); 
        return board;
    },
    // valid move
    addToken(board, cell, symbol)  {
        if (board[cell] == 0 ) {
            board[cell] = symbol;
            return true;
        } else {
            return false;
        }
    }
};

const playerController = (function () {
    const players =  [
        {
            name: 'Player One',
            token: 1,
            class: 'x'
        }, 
        {
            name: 'Player Two',
            token: 20,
            class: 'circle'
        }
    ];
    
    let activePlayer = {};

    function firstMove() {
        const first = Math.floor(Math.random() * 2);
        return activePlayer = players[first];
    } 

    function takeTurns() {
        activePlayer = activePlayer === players[0] ?  players[1] : players[0];
        return activePlayer;
    };

    return {activePlayer, players, firstMove, takeTurns}
})();

const results = (function () {
    const checkWin = (board) => {
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
                    return true;
                } else if (combo[i][0] == 20 && combo[i][1] == 20 && combo[i][2] == 20) {
                    winText(playerController.players[1].name);
                    return true;
                } else {
                    continue;
                }
            }
        })
    };

    const checkSpace = (board) => {
        if (board.includes(0)) {
            return true;
        } else {
            return false;
        }
    },

    winText = (winner) => {
        const winMsg = document.getElementById("win-msg");
        winMsg.classList.add("show");

        const winMsgText = document.getElementById("win-msg-text");        
        winMsgText.innerText = winner + " wins!";
    }

    const drawText = () => {
        const winMsg = document.getElementById("win-msg");
        winMsg.classList.add("show");

        const winMsgText = document.getElementById("win-msg-text");        
        winMsgText.innerText = "It's a draw!";
    }

    return {checkSpace, checkWin, winText, drawText};
})();

function reset(board) {    
        const winMsg = document.getElementById("win-msg");
        winMsg.classList = 'win-msg';
        const square = document.querySelectorAll(".square");
        // remove box.child
        const parent = document.getElementById('box');
        const child = document.querySelectorAll('.square');
        child.forEach(square => {
            parent.removeChild(square);
        })

        box.classList ='box';
        display();          
}  


function render(board) {
    // DOM needed
    const square = document.querySelectorAll(".square");
    let i = 0;
    square.forEach(grid => {
    // switch if 0 1 20 display '', x, o
    switch (board[i]) {
        case 0 :
            break;
        case 1 :
            grid.classList.add('x');
            break;
        case 20 :
            grid.classList.add('circle');
            break; 
        }
        i++;
    }) 
}    

function display() {
    let board = Setup.board();
    
    let activePlayer = playerController.firstMove();
    console.log(activePlayer);
    let symbol = activePlayer.token;
    // add class to board    
    const box = document.getElementById('box');
    box.classList.add(activePlayer.class);
    
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener("click", () => {
        console.log(board);
        reset(board);
    })  
    // create grid
    for (let i = 0; i < 9; i++) {    
        let square = document.createElement("div");
        square.dataset.index = i;
        square.classList = 'square';
        box.appendChild(square);
        square.addEventListener("click", () => {
            addMark(board, square);    
        })        
    }
    
    function addMark(board, cell) {
    
        if (Setup.addToken(board, cell.dataset.index, symbol)) {
            console.log(board); 
            render(board); 
            results.checkWin(board);
            results.checkSpace(board);
            activePlayer = playerController.takeTurns(activePlayer);
            box.classList = 'box';
            box.classList.add(activePlayer.class);
            symbol = activePlayer.token;     
        }
        
        if (!results.checkWin(board) && !results.checkSpace(board) ) {
            results.drawText();
        }         
    } 
};

display();

// form for players to enter name

