import { createAction } from '@reduxjs/toolkit';

export const addScore = createAction('SCOREBOARD/ADD_SCORE', (winner: Player, loser: Player) => ({
  payload: {
    winner,
    loser,
  },
}));
