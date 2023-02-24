import { createSelector } from 'reselect';
import * as gameBoard from './game-board.reducer';
const getGameBoardState = (state: RootReducer) => state.gameBoard;

export const getPlayersData = createSelector(getGameBoardState, gameBoard.getPlayersData);
export const getData = createSelector(getGameBoardState, gameBoard.getData);
export const getCurrentSymbol = createSelector(getGameBoardState, gameBoard.getCurrentSymbol);
export const getWinner = createSelector(getGameBoardState, gameBoard.getWinner);
