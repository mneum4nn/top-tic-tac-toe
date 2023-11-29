//GLOBAL VARIABLE DECLARATIONS
    //DOM variables
    const gameDisplay = document.querySelector('.game-page'); 
    const playBtn = document.getElementById('play-btn');
    const welcomeDisplay = document.querySelector('.welcome-page');
    const view = document.getElementById('view');
    //EVENT LISTENERS 
        playBtn.addEventListener('click', () => {
            game.createBoard();
    });    


//FACTORY FUNCTION AREA
//TODO: create gameboard object with board as a local array
    //include the gameboards own methods within this function, creating them as IIFE when possible
const game = ( function () {
    let gameboard = [];
    let playerScore = 0; 
    let computerScore = 0;
    let playerTurn = true;

    const createBoard = function (){
        for (let i = 0 ; i < 9; i++){
                    //creates each gameboard sqr
                    gameboard.push('');
                    const tile = document.createElement('div');
                        tile.classList.add('tile');
                        tile.setAttribute('id', gameboard.length-1);
                        tile.addEventListener('click',(event) => playGame(event.target));
                    gameDisplay.appendChild(tile);               
        }
    //remove play button from screen
    view.removeChild(welcomeDisplay);
    }
    const playGame = function (tile){
        let roundOver = false; 
            //create event listener on click for each tile alters gameboard array and gameboard display
            if (playerTurn == true) {
                const xIndex = tile.id; 
                gameboard[xIndex] = 'X';
                tile.innerHTML = gameboard[xIndex];
                playerTurn = false;
                } else 
                {
                    let choiceMade = false;
                    function getRandomNumber() {
                        return Math.floor(Math.random() * 9);
                }
                while (choiceMade == false){
                    let oIndex = getRandomNumber();
                    if (gameboard[oIndex] == ''){
                        const chosenTile = document.getElementById(oIndex);
                        gameboard[oIndex] = 'O'
                        chosenTile.innerHTML = gameboard[oIndex];
                        choiceMade==true;
                    }
                }
                playerTurn = true;
            }
            const checkIfPlayerWon =  function (){
                if (gameboard[0]&&gameboard[1]&&gameboard[2] == 'X'){
                    playerScore++;
                    roundOver = true; 
                } else if (gameboard[3]&&gameboard[4]&&gameboard[5] == 'X'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[6]&&gameboard[7]&&gameboard[8] == 'X'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[0]&&gameboard[3]&&gameboard[6] == 'X'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[1]&&gameboard[4]&&gameboard[7] == 'X'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[2]&&gameboard[5]&&gameboard[8] == 'X'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[0]&&gameboard[4]&&gameboard[8] == 'X'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[2]&&gameboard[4]&&gameboard[6] == 'X'){
                    playerScore++;
                    roundOver = true; 
                }
            }
            const checkIfComputerWon = function(){
                if (gameboard[0]&&gameboard[1]&&gameboard[2] == 'O'){
                    computerScore++;
                    roundOver = true; 
                } else if (gameboard[3]&&gameboard[4]&&gameboard[5] == 'O'){
                    computerScore++;
                    roundOver = true; 
                }
                else if (gameboard[6]&&gameboard[7]&&gameboard[8] == 'O'){
                    computerScore++;
                    roundOver = true; 
                }               
                else if (gameboard[0]&&gameboard[3]&&gameboard[6] == 'O'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[1]&&gameboard[4]&&gameboard[7] == 'O'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[2]&&gameboard[5]&&gameboard[8] == 'O'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[0]&&gameboard[4]&&gameboard[8] == 'O'){
                    playerScore++;
                    roundOver = true; 
                }
                else if (gameboard[2]&&gameboard[4]&&gameboard[6] == 'O'){
                    playerScore++;
                    roundOver = true; 
                }
            }
        //once round is over, a button should appear and if clicked we clear the gameboard for a new round
        const newRoundBtn = document.createElement('button');
            newRoundBtn.classList.add('game-control');
            newRoundBtn.setAttribute(id, 'new-round');
        newRoundBtn.addEventListener('click',()=>{
            gameboard.splice('');
            console.log(gameboard);
            document.querySelector('.tile').innerHTML = ' ';
            roundOver = false;
        });
    }
    return {createBoard,playGame}
})();



