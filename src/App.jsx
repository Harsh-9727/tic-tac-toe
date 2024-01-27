import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { useState } from "react"
function App() {

  const [activePlayer, setIsActivePlayer] = useState('X');
  const [gameTurns, setGameTurns]= useState([])

  const handleOnSelectSquare = (rowIndex, colIndex) => {
    setIsActivePlayer(prevActivePlayer => prevActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      let updatedTurns = prevTurns;
      let turn = 'X';
      if(prevTurns[0]?.player === 'X') turn = 'O'
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
  
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="Harsh" symbol= 'O' activePlayer={activePlayer === 'O'} />
        <Player name="Krishna" symbol='X' activePlayer={activePlayer === 'X'} />
      </ol>
      <GameBoard turns={gameTurns} onSelectSquare={handleOnSelectSquare}/>
      <Log gameTurns={gameTurns}></Log>
    </div>
  </main>
}

export default App
