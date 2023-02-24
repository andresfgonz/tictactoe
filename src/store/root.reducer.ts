import { combineReducers } from '@reduxjs/toolkit';
import * as gameBoard from '@/store/game-board/game-board.reducer';
import * as scoreBoard from '@/store/score-board/score-board.reducer';

export const rootReducer = combineReducers<RootReducer>({
  gameBoard: gameBoard.reducer,
  scoreBoard: scoreBoard.reducer,
});
