import * as scoreBoard from './score-board.reducer';
import { createSelector } from 'reselect';

const getScoreBoardState = (state: RootReducer) => state.scoreBoard;
export const selectData = createSelector(getScoreBoardState, scoreBoard.getData);
