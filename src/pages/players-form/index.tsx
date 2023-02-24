import { PlayersForm as Component } from './players-from';
import * as actions from '@/store/game-board/game-board.actions';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PlayersForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setPlayers = useCallback(
    (player1Name: string, player2Name: string) => {
      dispatch(actions.setPlayers(player1Name, player2Name));
      navigate('/gameBoard');
    },
    [dispatch, navigate],
  );

  return <Component setPlayers={setPlayers} />;
};
