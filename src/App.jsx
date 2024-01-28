import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { WINNING_COMBINATIONS } from "./winning-combinations"

const PLAYERS = {
  X: 'Krishna',
  O: 'Harsh'
}
const INITIAL_STATE = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveGameBoard (gameTurns) {
  let gameBoard = [...INITIAL_STATE.map(innerEle => [...innerEle])];
  
  for (const turn of gameTurns){
    const { square, player } = turn;
    const { row , col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

function derivePlayer (GameTurns) {

  let currentPlayer = 'X';

  if(GameTurns.length && GameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function deriveWinner (gameBoard,playerName) {
  let winner = null;

  for( const combinations of WINNING_COMBINATIONS){
    const fSquare = gameBoard[combinations[0].row][combinations[0].column];
    const sSquare = gameBoard[combinations[1].row][combinations[1].column];
    const tSquare = gameBoard[combinations[2].row][combinations[2].column];

    if(fSquare && fSquare === sSquare && fSquare === tSquare){
      winner = playerName[fSquare];
    }
  }

  return winner;
};

function App() {
  const [gameTurns, setGameTurns]= useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = derivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard,playerName);
  const wasDraw = gameTurns.length === 9 && !winner;

  const handleOnSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {

      const turn = derivePlayer(prevTurns);

      let updatedTurns = prevTurns;

      updatedTurns = [{
        square:{
          row:rowIndex,
          col:colIndex
        },
        player: turn
      },
      ...prevTurns,
    ];

      return updatedTurns;
    });
  }

  const handleChangeName = (symbol,newName) => {
    setPlayerName(prevName => {
     return {
      ...prevName,
      [symbol]:newName
     }
    })
  };

  const handleReset = () => {
    setGameTurns([]);
  };
  
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name={PLAYERS.O} symbol= 'O' activePlayer={activePlayer === 'O'} onChangeName={handleChangeName} />
        <Player name={PLAYERS.X} symbol='X' activePlayer={activePlayer === 'X'} onChangeName={handleChangeName} />
      </ol>
      {(winner || wasDraw) && <GameOver resetGame={handleReset} winner={winner}></GameOver>}
      <GameBoard turns={gameTurns} onSelectSquare={handleOnSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}> Logs </Log>
  </main>
}

export default App
