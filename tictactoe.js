

    
playerList = [];
player1 = createPlayer('player1', 'X');
player2 =createPlayer('player2', 'O');
playerList.push(player1);
playerList.push(player2)


//module that returns a controlBoard
const controlBoard = (function ()
{
    gameBoard = {}
    gameBoard['A'] = []
    gameBoard['B'] = []
    gameBoard['C'] = []
    //turn tracker value
    let currentTurn = player1;
    let gameInProgress = true;
    const createCells = () =>
    {
        for (row in gameBoard)
        {
            for (let i = 0; i< 3; i++)
            {
                gameBoard[row][i] = ' ';
            }
        }
    }

    //dont need to pass currentTurn to playTurn it already has access
    const playTurn = function (row, pos) 
    {//adds a player marker to the grid
        if(gameInProgress==true)
        {
            row = row.toUpperCase()
            
        
            if (! row in Object.keys(gameBoard) || pos < 0 || pos >2)
            {
                console.log('INPUT A VALID MOVE');
                return;
            }
            //check if already occupied
            else if (checkCell(row,pos) != " ")
            {
                console.log("Already Occupied");
                return;
    
            }
            gameBoard[row][pos] = currentTurn['marker'];
            //change player turn
            this.textContent = currentTurn['marker'];
            if (currentTurn == player1)
            {
                currentTurn = player2;
            }
            else
            {
                currentTurn = player1;
            }
            //shows the current board state
            
            displayBoard();
            console.log(`${currentTurn['name']}'s turn`)
            checkGameEnd();
        }
       
    }


    const displayBoard = () =>
    {   
        boardStr = "";
        let count = 0;
        for (key in gameBoard)
        {
            //gameboard['key'] is an array of cell objects, get all cell objects['marker']
            //print each element in the key
            lineDisplay = gameBoard[key].join("|")
            boardStr += lineDisplay;
            if (count < 2)
            {
                boardStr += "\n"
            }
            count++
        }
        console.log(boardStr);
    }
    //check winner using marker
    const determineWinner = (marker) =>
    {
        for (player of playerList)
        {
            if (player['marker'] == marker)
            {
                return player['name'];
            }
        }
    }
    //check if game is over
    const checkGameEnd = () =>
    {
        let remaining = 0;
        for (row in gameBoard)
        {
            for (let i =0; i < gameBoard[row].length; i++)
            {
                if (gameBoard[row][i] == " ")
                {
                    remaining +=1;
                }
            }
        }
        //check for all horizontal wins
        for (key in gameBoard)
        {
            if ((gameBoard[key][0]!= " "&&gameBoard[key][1]!=" "&&gameBoard[key][2]!=" ")&&(gameBoard[key][0]==gameBoard[key][1]&&gameBoard[key][0]==gameBoard[key][2]))
            {
                console.log("horizontal win")
                winner = determineWinner(gameBoard[key][0])
                console.log(`Game Over Winner : ${winner}`)
                gameInProgress = false;
            
            }
        }
        //vertical wins
        for (let i =0; i< 3;i++)
        {
            if ((gameBoard['A'][i]!= " "&&gameBoard['B'][i]!=" "&&gameBoard['C'][i]!= ' ')&&(gameBoard['A'][i]==gameBoard['B'][i]&&gameBoard['A'][i]==gameBoard['C'][i]))
            {
              
                winner = determineWinner(gameBoard['A'][i])
                alert(`Game Over Winner : ${winner}`)
                gameInProgress = false;
            }
        }
        //diagonal wins
        if ((gameBoard['A'][0]!=" "&&gameBoard['B'][1]!= " "&&gameBoard['C'][2]!= " ")&&(gameBoard['A'][0] == gameBoard['B'][1]&&gameBoard['A'][0]==gameBoard['C'][2]))
        {
            
            winner = determineWinner(gameBoard["A"][0])
            alert(`Game Over Winner : ${winner}`)
            gameInProgress = false;
        }
        else if ((gameBoard['A'][2]!=" "&&gameBoard['B'][1]!= " "&&gameBoard['C'][0]!= " ")&&(gameBoard['A'][2] == gameBoard["B"][1] && gameBoard['A'][2] == gameBoard['C'][0]))
        {
           
            winner = determineWinner(gameBoard["A"][2])
            alert(`Game Over Winner : ${winner}`)
            gameInProgress = false;
        }
        //check for draws
        
        else if (remaining == 0)
        {
            alert("DRAW");
            gameInProgress = false;
        }
    }
    //check cell marker
    const checkCell = (row,pos) =>
    {
        return gameBoard[row][pos]
    }
    createCells();

    const startGame = function()
    {
        gameInProgress = true;
        gridSquareList = document.querySelectorAll(".grid")
        for ( let i =0; i < gridSquareList.length; i++)
        {
            gridSquareList[i].textContent = "";

        }
        currentTurn = player1;
        for (row in gameBoard)
        {
            for(let i = 0; i < gameBoard[row].length; i++)
            {
                gameBoard[row][i]= " ";
            }
        }
    }
    
    return {playTurn, displayBoard, checkCell, startGame};
})();

//displays empty board
controlBoard.displayBoard();



//game sequence function
// function playGame (player1, player2, gameBoard)
// {
//     alert('game start')
    
// }



function createPlayer (name, marker)
{
    playerWins = 0
    
    const checkWins = () =>
    {
        console.log(`${name} has ${playerWins} wins`)
    }
    return {name, marker, checkWins}
}

//turn tracker function


document.addEventListener("DOMContentLoaded", function()
{
    //TODO MAKE EVENT LISTENER THAT STARTS THE GAME
  //add event listener play turn to the boxes, getting position from id
    startButton = document.querySelector("#start-button")
    startButton.addEventListener("click",function()
    {
        controlBoard.startGame()
    })
    gridSquareList = document.querySelectorAll(".grid");
    for (let i = 0; i<gridSquareList.length; i++)
    {
        let gridID = gridSquareList[i].getAttribute("id");
        gridSquareList[i].addEventListener("click", function()
        {
            console.log(gridID[0],gridID[1])
            // gridSquareList[i].textContent = currentTurn['marker']
            controlBoard.playTurn.call(gridSquareList[i], gridID[0], Number(gridID[1])-1);
            
        })
        
    }
    //for player names TODO
    //playerList[0] is player1
    player1Button = document.querySelector("#player1change");
    player1Button.addEventListener("click", function()
    {   
        
        let player1Name = document.querySelector("[name=player1name]").value
        nameDisplay1 = document.querySelector("#player1-Name")
        player1['name'] = player1Name;
        nameDisplay1.textContent = player1Name;

    })
    player2Button = document.querySelector("#player2change");
    player2Button.addEventListener("click", function()
    {
        let player2Name = document.querySelector("[name=player2name]").value
        nameDisplay2 = document.querySelector("#player2-Name");

        player2['name'] = player2Name;
        nameDisplay2.textContent = player2Name;
    })


})


//