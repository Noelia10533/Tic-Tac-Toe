import React from 'react';
import { render, screen } from '@testing-library/react';
import { calculateWinner, SquareValue, Square, Board } from './Type.tsx';

test('Test 1: returns null for an empty board', () => {
    const emptyBoard = Array(9).fill(null); //Crea el tablero vacio (un array con 9 nulls)
    expect(calculateWinner(emptyBoard)).toBeNull(); //Traducción: se espera que la función con el tablero vacio retorne null
});


test('Test 2: detects a row win for X', () => {
    const rowWin: SquareValue[] = ['X','X','X', null,null,null, null,null,null];
    expect(calculateWinner(rowWin)).toBe('X');

})

test('Test 3: detects a column win for 0', () => {
    const columnWin: SquareValue[] = ['O', null, null, 'O', null, null, 'O', null, null];
    expect(calculateWinner(columnWin)).toBe('O');
})

test('Test 4: detects a diagonal win', () => {
    const diagonal: SquareValue[] = ['X', null, null, null, 'X', null, null, null, 'X'];
    expect(calculateWinner(diagonal)).toBe('X')
})

test('Test 5: returns null on a full board with no winner', () => {
    const noWinner: SquareValue[] = ['X','O','X','X','O','O','O','X','X'];
    expect(calculateWinner(noWinner)).toBeNull()
})

test('Test 6: renders the value passed via props', () => {
  const { rerender } = render(<Square value="X" onSquareClick={() => {}} />); //Extrae el valor X. Se le pasa la función vacia porque no es necesario hacer click
  expect(screen.getByRole('button').textContent).toBe('X'); //Busca un botón y se asegura que el texto es una X


  rerender(<Square value="O" onSquareClick={() => {}} />); //Lo mismo, pero con el O
  expect(screen.getByRole('button').textContent).toBe('O');
});

test('Test 7: renders an empty button when value is null', () =>{
    render(<Square value= {null} onSquareClick={() => {}} />);
    expect(screen.getByRole('button').textContent).toBeNull;
});

test('Test 8: calls onSquareClick exactly once when clicked', () => {
    const mock = jest.fn() //Crea una función que registra cada vez que es llamada
    render(<Square value= 'X' onSquareClick={mock} />); 
    screen.getByRole('button').click() //Simula un clic
    expect(mock).toHaveBeenCalledTimes(1);
});

test('Test 9: shows "Next player: X" when xIsNext is true and the board is empty', () => {
    const emptyBoard = Array(9).fill(null);
    render(<Board xIsNext= {true} squares= {emptyBoard} onPlay={() => {}} />);
    expect(screen.getByText('Siguiente jugador: X').textContent).toBe('Siguiente jugador: X'); //Busca el elemento que contiene el dato exacto y verifica que el texto es exactamente ese
});

test('Test 10: shows "Next player: O" when xIsNext is false', () => {
    const emptyBoard = Array(9).fill(null);
    render(<Board xIsNext= {false} squares= {emptyBoard} onPlay={() => {}} />);
    expect(screen.getByText('Siguiente jugador: O').textContent).toBe('Siguiente jugador: O');
});

test('Test 11: calls onPlay with the update squares array when an empty aquare is clicked', () => {
    const mock = jest.fn();
    const emptyBoard = Array(9).fill(null);
    render(<Board xIsNext= {true} squares={emptyBoard} onPlay={mock} />);

    const buttons = screen.getAllByRole('button'); //Obtiene todos los botones del tablero
    buttons[0].click(); //Hace clic en el primer boton (el primer cuadrado)
    expect(mock).toHaveBeenCalledWith(['X', null, null, null, null, null, null, null, null]);
});

test('Test 12: does not call onPlay when clicking an alreadey-filled square', () => {
    const boardX: SquareValue[] = ['X', null, null, null, null, null, null, null, null];
    const mock = jest.fn()
    render(<Board xIsNext= {true} squares={boardX} onPlay={() => {}} />);

    const buttons = screen.getAllByRole('button');
    buttons[0].click();
    expect(mock).not.toHaveBeenCalledWith(); //Se espera que no retorne nada ni llame a ninguna función
});

test('Test 13: show "Winner: X" when the squares prop contains a winning', () => {
    const boardWinner: SquareValue[] = ['X', 'X', 'X', null, null, null, null, null, null];
    render(<Board xIsNext= {true} squares={boardWinner} onPlay={() => {}} />);
    expect(screen.getByText('Ganador: X').textContent).toBe('Ganador: X');
})

test('Test 14: does not call onPlay when there is already a winner', () => {
    const boardWinner: SquareValue[] = ['X', 'X', 'O', 'X', 'O', 'O', 'O', null, 'X'];
    const mock = jest.fn()
    render(<Board xIsNext= {true} squares={boardWinner} onPlay={() => {}} />);
    
    const buttons = screen.getAllByRole('button');
    buttons[7].click();
    expect(mock).not.toHaveBeenCalledWith();
});

test('Test 15: full board with no winner', () => {
    const boardNoWinner: SquareValue[] = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    render(<Board xIsNext= {true} squares={boardNoWinner} onPlay={() => {}} />);
    expect(screen.getByText('Ha habido un empate').textContent).toBe('Ha habido un empate');
});