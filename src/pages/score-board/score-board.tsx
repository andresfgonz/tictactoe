import { FC } from 'react';

export type ComponentProps = {
  data: PlayerChartData[];
};

export const ScoreBoard: FC<ComponentProps> = ({ data }) => {
  return (
    <div>
      <div>Data for Chart</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
