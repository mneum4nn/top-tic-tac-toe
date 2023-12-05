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

function Player (symbol) {
    let score = 0; 
    this.symbol = symbol; 
    this.upScore = function (){
        score++;
    }
    this.getScore = function (){
        return score;
    }
    this.resetScore = function (){
        score = 0; 
    }
}
    let user = new Player('X');
    let computer = new Player('O');

//FACTORY FUNCTION AREA
//TODO: create scoreboard to keep score
const scoreBoard = (function (){

    const createScoreBoard = function (uS, cS){
        const board = document.createElement('div');
            board.classList.add('score-board');
        gameDisplay.appendChild(board);

        const playerScore = document.createElement('div');
                playerScore.classList.add('score');
            const playerHd = document.createElement('h1');
                playerHd.innerHTML = 'Your Score';
            const playerPoints = document.createElement('h2');
                playerPoints.innerHTML = uS;
        board.appendChild(playerScore);
        playerScore.appendChild(playerHd);
        playerScore.appendChild(playerPoints);

        const compScore = document.createElement('div');
            compScore.classList.add('score');
            const compHd = document.createElement('h1');
                compHd.innerHTML = 'Your Score';
            const compPoints = document.createElement('h2');
                compPoints.innerHTML = cS;
        board.appendChild(playerScore);
        compScore.appendChild(playerHd);
        compScore.appendChild(compPoints);
    }
    const update = function (){
        const v1 = user.getScore();
        const v2 = computer.getScore();
            createScoreBoard(v1,v2);      
    }
    return { createScoreBoard, update};
})();
//TODO: create gameboard object with board as a local array
const gameplay = (function (){

    let playerTurn = true;

    const playGame = function (tile) {
        let roundOver = false; 
            //create event listener on click for each tile alters gameboard array and gameboard display
            if (playerTurn == true) {
                const xIndex = tile.id; 
                gameboard[xIndex] = user.symbol;
                tile.innerHTML = user.symbol;
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
                        gameboard[oIndex] = computer.symbol;
                        chosenTile.innerHTML = computer.symbol;
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
                            user.upScore();
                    }
                    else if (symbol=='O'){
                            computer.upScore();
                    }
                    scoreBoard.update();
                } 
            }
        }
        //TODO: check for tie 
        function checkForTie(){
            let tie = true; 
            for(let i=0; i<gameboard.length; i++){
                if (gameboard[i]==null){
                    tie=false;
                }
            }
            if (tie==true){
                roundOver=true;
            };
        }
        checkForWin('X');
        checkForWin('O');
        checkForTie();
        if (roundOver == true) {        
        //once round is over, a button should appear and if clicked we clear the gameboard for a new round
            const newRoundBtn = document.createElement('button');
                newRoundBtn.classList.add('game-control');
                newRoundBtn.setAttribute('id', 'new-round');
                newRoundBtn.innerHTML='Next Round';
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
    const createResetBtn = function (){
        const resetBtn = document.createElement('button');
            resetBtn.innerHTML = 'Reset Game';
            resetBtn.classList.add('reset');
            resetBtn.addEventListener('click', () =>{
                user.resetScore();
                computer.resetScore();
                scoreBoard.update('0','0');
                game.createBoard();
    
            });
        gameDisplay.appendChild(resetBtn);
    }
    return { createBoard, createResetBtn };
}) ();



