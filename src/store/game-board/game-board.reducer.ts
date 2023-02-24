import { createReducer } from '@reduxjs/toolkit';
import * as actions from './game-board.actions';
import { v4 as uuid } from 'uuid';

export type ReducerState = {
  data: GameBoardCell[];
  playersData: { player1: Player; player2: Player };
  currentSymbol: string;
  winner: Player;
};

const initialState: ReducerState = {
  playersData: {
    player1: null,
    player2: null,
  },
  data: [
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
  ],
  currentSymbol: null,
  winner: null,
};

const winCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.markCell, (state, action) => {
      const { cellIndex } = action.payload;
      if (!state.currentSymbol || state.currentSymbol === 'O') {
        state.data[cellIndex] = { symbol: 'X' };
        state.currentSymbol = 'X';
      } else {
        state.data[cellIndex] = { symbol: 'O' };
        state.currentSymbol = 'O';
      }

      for (const winCase of winCases) {
        const selectionSymbols = winCase.map((i) => state.data[i].symbol);

        if (selectionSymbols.every((symbol) => symbol === 'X')) {
          state.playersData.player1.score++;
          state.winner = state.playersData.player1;
          break;
        }

        if (selectionSymbols.every((symbol) => symbol === 'O')) {
          state.playersData.player2.score++;
          state.winner = state.playersData.player2;
          break;
        }
      }
    })
    .addCase(actions.setPlayers, (state, action) => {
      const { player1Name, player2Name } = action.payload;
      state.playersData = {
        player1: { id: uuid(), name: player1Name, score: 0 },
        player2: { id: uuid(), name: player2Name, score: 0 },
      };
    })
    .addCase(actions.resetBoard, (state) => {
      state.data = initialState.data;
      state.winner = null;
      state.currentSymbol = null;
    });
});

export const getPlayersData = (state: ReducerState) => state.playersData;
export const getData = (state: ReducerState) => state.data;
export const getCurrentSymbol = (state: ReducerState) => state.currentSymbol;
export const getWinner = (state: ReducerState) => state.winner;
