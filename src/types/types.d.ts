declare type GameBoardCell = {
  symbol: string;
};

declare type Player = {
  id: string;
  name: string;
  score: number;
};

declare type PlayerChartData = {
  id: string;
  name: string;
  wins: number;
  loses: number;
};
