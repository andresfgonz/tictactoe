import { createAction } from '@reduxjs/toolkit';

export const markCell = createAction('GAME_BOARD/MARK_CELL', (cellIndex: number) => ({
  payload: { cellIndex },
}));

export const setPlayers = createAction(
  'GAME_BOARD/SET_PLAYERS',
  (player1Name: string, player2Name: string) => ({
    payload: { player1Name, player2Name },
  }),
);

export const resetBoard = createAction('GAME_BOARD/RESET_BOARD');
