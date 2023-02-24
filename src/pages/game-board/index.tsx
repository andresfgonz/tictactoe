import { GameBoard as Component } from './game-board';
import * as selectors from '@/store/game-board/game-board.selectors';
import * as actions from '@/store/game-board/game-board.actions';
import * as scoreActions from '@/store/score-board/score-board.actions';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const GameBoard: FC = () => {
  const dispatch = useDispatch();
  const boardData = useSelector(selectors.getData);
  const winner = useSelector(selectors.getWinner);
  const playersData = useSelector(selectors.getPlayersData);

  const selectCell = useCallback(
    (cellIndex: number) => {
      dispatch(actions.markCell(cellIndex));
    },
    [dispatch],
  );

  const resetBoard = useCallback(() => {
    dispatch(actions.resetBoard());
  }, [dispatch]);

  const addScore = useCallback(
    (winner: Player, loser: Player) => {
      dispatch(scoreActions.addScore(winner, loser));
    },
    [dispatch],
  );

  return (
    <Component
      boardData={boardData}
      selectCell={selectCell}
      winner={winner}
      playersData={playersData}
      resetBoard={resetBoard}
      addScore={addScore}
    />
  );
};
