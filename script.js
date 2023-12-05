//GLOBAL VARIABLE DECLARATIONS
    //DOM variables
    const gameDisplay = document.querySelector('.game-page'); 
    const playBtn = document.getElementById('play-btn');
    const welcomeDisplay = document.querySelector('.welcome-page');
    const view = document.getElementById('view');

    playBtn.addEventListener('click', (event)=>{
        const board = game.createBoard();
        console.log(board);

        return board;
    });

    let gameboard = [];

//FACTORY FUNCTION AREA
//TODO: create gameboard object with board as a local array
const gameplay = (function (){
    let playerScore = 0; 
    let computerScore = 0;
    let playerTurn = true;
    const playGame = function (tile) {
        let roundOver = false; 
            //create event listener on click for each tile alters gameboard array and gameboard display
            if (playerTurn == true) {
                const xIndex = tile.id; 
                gameboard[xIndex] = 'X';
                tile.innerHTML = gameboard[xIndex];
                playerTurn = false;
                } 
            else {
                let oIndex; 
                function getRandomNumber() {
                    return Math.floor(Math.random() * 9);
                }
                while (oIndex == null){
                let rN = getRandomNumber();
                if (gameboard[rN] == ''){
                    oIndex = rN;
                    const chosenTile = document.getElementById(oIndex);
                    gameboard[oIndex] = 'O'
                    chosenTile.innerHTML = gameboard[oIndex];
                    }                            
                }
                playerTurn = true;
            }

        function checkForWin(symbol) {
        // Define all possible winning combinations
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];          
        // Check each winning condition
            for (const condition of winConditions) {
                const [a, b, c] = condition;
                if (gameboard[a] === symbol && gameboard[b] === symbol && gameboard[c] === symbol) {
                    roundOver = true;; // Found a winning combination
                    if (symbol=='X'){
                            playerScore++;
                    }
                    else if (symbol=='O'){
                            computerScore++;
                    }
                } 
            }
        }
        checkForWin('X');
        checkForWin('O');
        if (roundOver == true) {        
        //once round is over, a button should appear and if clicked we clear the gameboard for a new round
            const newRoundBtn = document.createElement('button');
                newRoundBtn.classList.add('game-control');
                newRoundBtn.setAttribute('id', 'new-round');
                gameDisplay.appendChild(newRoundBtn);
                newRoundBtn.addEventListener('click',()=>{
                    gameboard.splice('');
                    console.log(gameboard);
                    document.querySelector('.tile').forEach(tile  => {
                        tile.innerHTML = ''
                    });
                });

            }    
        }
        return {playGame};
})();

const game = ( function () {
    const createBoard = function (){
        for (let i = 0 ; i < 9; i++){
            //creates each gameboard sqr
            gameboard.push('');
            const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.setAttribute('id', gameboard.length-1);
                tile.addEventListener('click', () => gameplay.playGame(tile));

            gameDisplay.appendChild(tile);               
        }
    //remove play button from screen
    view.removeChild(welcomeDisplay);
    };
    return { createBoard };
}) ();



