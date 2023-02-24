import * as gameBoard from '@/store/game-board/game-board.reducer';
import * as scoreBoard from '@/store/score-board/score-board.reducer';

declare global {
  type RootReducer = {
    gameBoard: gameBoard.ReducerState;
    scoreBoard: scoreBoard.ReducerState;
  };
}
