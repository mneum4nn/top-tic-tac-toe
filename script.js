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
    const createBoard = function (){
        for (let i = 0 ; i < 9; i++){
                    //creates each gameboard sqr
                    gameboard.push('');
                    const tile = document.createElement('div');
                        tile.classList.add('tile');
                        tile.setAttribute('id', gameboard.length-1)
                    gameDisplay.appendChild(tile);               
        }
    //remove play button from screen
    view.removeChild(welcomeDisplay);
    }
    const keepScore = function (){
        

    }
    return {createBoard}
})();



