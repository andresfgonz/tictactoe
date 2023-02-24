import { createReducer } from '@reduxjs/toolkit';
import * as actions from './score-board.actions';

export type ReducerState = {
  data: PlayerChartData[];
};

const initialState: ReducerState = {
  data: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.addScore, (state, action) => {
    const { winner, loser } = action.payload;
    const wPlayer = state.data.find(({ name }) => name === winner.name);

    if (wPlayer) wPlayer.wins++;
    else state.data.push({ id: winner.id, name: winner.name, wins: 1, loses: 0 });

    const lPlayer = state.data.find(({ name }) => name === loser.name);
    if (lPlayer) lPlayer.loses++;
    else state.data.push({ id: loser.id, name: loser.name, wins: 0, loses: 1 });
  });
});

export const getData = (state: ReducerState) => state.data;
