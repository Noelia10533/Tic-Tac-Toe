import { useState } from 'react';
import styled from 'styled-components'

export type SquareValue = 'X' | 'O' | null;

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

const StyleButtonSquare = styled.button<{ $value: SquareValue }>`
  background-color: #e2e1a6;
  border-radius: px;
  border: 4px solid #000000;
  color: #1f3911;
  padding: 3em 3em;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;      
  overflow: hidden; 
  flex-shrink: 0;
  font-size: 2rem; 
`;

export function Square({ value, onSquareClick }: SquareProps) {
  return (
    <StyleButtonSquare $value={value} className="square" onClick={onSquareClick}>
      {value}
    </StyleButtonSquare>
  );
}

interface BoardProps{
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (squares: SquareValue[]) => void;
}

const StyleBoard = styled.div`
  display: flex;          
  flex-direction: row;
`

const StyleText = styled.div`
  color: #1f3911;
`

function Board({ xIsNext, squares, onPlay }: BoardProps) {
    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i]) {
        return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
        nextSquares[i] = 'X';
        } else {
        nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
    status = 'Ganador: ' + winner;
    } else if (squares.every((square) => square != null)){
    status = 'Ha habido un empate';
    } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
    } 

    return (
    <>
      <StyleText className="status">{status}</StyleText>
      <StyleBoard className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </StyleBoard>
      <StyleBoard className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </StyleBoard>
      <StyleBoard className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </StyleBoard>
    </>
  );
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
`

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column; 
`

const StyleGame = styled.button`
  height: 100px;
  width: 500px;
  background-color: #e2e1a6;
  border: 3px solid #000000;
  padding: 10px;
  box-shadow: 5px 5px 5px 0px lightgray;
  margin: 10px;
`

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir al movimiento #' + move;
    } else {
      description = 'Ir al inicio del juego';
    }
    return (
      <li key={move}>
        <StyleGame onClick={() => jumpTo(move)}>{description}</StyleGame>
      </li>
    );
  });

  return (
    <GameContainer className="game">
      <BoardContainer className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </BoardContainer>
      <GameInfo className="game-info">
        <ol>{moves}</ol>
      </GameInfo>
    </GameContainer>
  );
}

export function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}