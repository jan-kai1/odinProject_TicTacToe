

    //module for gameboard
playerList = [];
player1 = createPlayer('player1', 'X');
player2 =createPlayer('player2', 'O');
playerList.push(player1);
playerList.push(player2)
const controlBoard = (function ()
{
    gameBoard = {}
    gameBoard['A'] = []
    gameBoard['B'] = []
    gameBoard['C'] = []
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


    const playTurn = (player, row, pos) =>
    {//adds a player marker to the grid
        row = row.toUpperCase()
        pos = pos -1
        if (! row in Object.keys(gameBoard) || pos < 0 || pos >2)
        {
            console.log('INPUT A VALID MOVE')
            return;
        }
        gameBoard[row][pos] = player['marker'];
        //shows the current board state
        displayBoard();
        checkGameEnd();
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
        //check for all horizontal wins
        for (key in gameBoard)
        {
            if ((gameBoard[key][0]!= " "&&gameBoard[key][1]!=" "&&gameBoard[key][2]!=" ")&&(gameBoard[key][0]==gameBoard[key][1]&&gameBoard[key][0]==gameBoard[key][2]))
            {
                console.log("horizontal win")
                winner = determineWinner(gameBoard[key][0])
                console.log(`Game Over Winner : ${winner}`)
            
            }
        }
        //vertical wins
        for (let i =0; i< 3;i++)
        {
            if ((gameBoard['A'][i]!= " "&&gameBoard['B'][i]!=" "&&gameBoard['C'][i]!= ' ')&&(gameBoard['A'][i]==gameBoard['B'][i]&&gameBoard['A'][i]==gameBoard['C'][i]))
            {
                console.log("vertical win")
                console.log(i)
                winner = determineWinner(gameBoard['A'][i])
                console.log(`Game Over Winner : ${winner}`)
            }
        }
        //diagonal wins
        if ((gameBoard['A'][0]!=" "&&gameBoard['B'][1]!= " "&&gameBoard['C'][2]!= " ")&&(gameBoard['A'][0] == gameBoard['B'][1]&&gameBoard['A'][0]==gameBoard['C'][2]))
        {
            console.log("Diagonal Win")
            winner = determineWinner(gameBoard["A"][0])
            console.log(`Game Over Winner : ${winner}`)
        }
        else if ((gameBoard['A'][2]!=" "&&gameBoard['B'][1]!= " "&&gameBoard['C'][0]!= " ")&&(gameBoard['A'][2] == gameBoard["B"][1] && gameBoard['A'][2] == gameBoard['C'][0]))
        {
            console.log("Diagonal Win")
            winner = determineWinner(gameBoard["A"][2])
            console.log(`Game Over Winner : ${winner}`)
        }
    }
    createCells();
    
    return {playTurn, displayBoard};
})();

//displays empty board
controlBoard.displayBoard();



//game sequence



function createPlayer (name, marker)
{
    playerWins = 0
    
    const checkWins = () =>
    {
        console.log(`${name} has ${playerWins} wins`)
    }
    return {name, marker, checkWins}
}









//board made of 3 arrays each with 3 cell each
//make object for each cell grid


// function createBoardCell (row)
// {
//     boardCell = {};
//     boardCell['row'] = row;
//     boardCell['marker'] = ' ';
       
//     boardCell.getValue= () =>
//     {
//         return boardCell.marker;
//     }
//     return boardCell;
// }













