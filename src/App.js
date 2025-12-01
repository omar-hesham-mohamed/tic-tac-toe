import {useState} from 'react';

function Square({value, onSquareClick}) {

  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  );
}

function Board({squares, onPlay, xIsNext}) {
  const [gameStatus, setGameStatus] = useState('');

  function handleClick(i) {
    const winner = calculateWinner(squares);
    if (winner){
      setGameStatus("Winner: " + winner);
      return;
    }
    if (squares[i]) 
      return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O'; 
    onPlay(nextSquares);
    // We cant mutate state directly, react checks for state change to rerender so it wont change.
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i=0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }

    return null;
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <h2 className='status'>{gameStatus}</h2>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>  
        {/* We dont want to call fn but we want to set its parameters, so we create an inline fn */}
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    setHistory(history.slice(0, move + 1));
    setXIsNext(move % 2 === 0);
  } 

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key= {move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
