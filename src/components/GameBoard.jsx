const initialState = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

export default function GameBoard ({onSelectSquare, turns}) {

    let gameBoard = initialState;

    for (const turn of turns){
        gameBoard[turn.square.row][turn.square.col] = turn.player;
    }


    return (
        <ol id="game-board">
           {gameBoard.map((row,rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((colPlayerSymbol,colIndex)=> (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex,colIndex)}>{colPlayerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
           ))}
        </ol>
    );
};