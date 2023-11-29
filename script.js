//GLOBAL VARIABLE DECLARATIONS
    //DOM variables
    const gameDisplay = document.querySelector('.game-page'); 
    const playBtn = document.getElementById('play-btn');
    const welcomeDisplay = document.querySelector('.welcome-page');

    //EVENT LISTENERS 
        playBtn.addEventListener('click', () => {
            makeGameboard();
    });    


//FACTORY FUNCTION AREA
//TODO: create gameboard object with board as a local array
    //include the gameboards own methods within this function, creating them as IIFE when possible
 const game = ( function () {
    const createBoard = function (){
        let gameboard = [];
        for (let i = 0 ; i < 3; i++){
            //create each row
            const boardRow = document.createElement('div');
                boardRow.classList.add('grid-row');
                boardRow.setAttribute('id', 'row'+i);
            gameDisplay.appendChild(boardRow);
                for (let j = 0; j<3; j++){
                    //creates each gameboard sqr
                    gameboard.push('');
                    const tile = document.createElement('div');
                        tile.classList.add('tile');
                        tile.setAttribute('id', gameboard.length-1)
                    boardRow.appendChild(tile);
                }        
        }
    //remove play button from screen
    welcomeDisplay.removeChild(playBtn);
    }
    

})();


