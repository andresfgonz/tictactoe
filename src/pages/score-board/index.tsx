import { ScoreBoard as Component } from './score-board';
import * as selectors from '@/store/score-board/score-board.selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';

export const ScoreBoard: FC = () => {
  const data = useSelector(selectors.selectData);

  return <Component data={data} />;
};
