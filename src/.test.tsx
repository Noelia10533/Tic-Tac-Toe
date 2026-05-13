import React from 'react';
import { render, screen } from '@testing-library/react';
import { calculateWinner, SquareValue, Square } from './Type.tsx';

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
  expect(screen.getByRole('button')).toHaveTextContent('X'); //Busca un botón y se asegura que el texto es una X


  rerender(<Square value="O" onSquareClick={() => {}} />); //Lo mismo, pero con el O
  expect(screen.getByRole('button')).toHaveTextContent('O');
});