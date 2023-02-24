import { FC, useEffect, useMemo } from 'react';
import styles from './game-board.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type ComponentProps = {
  boardData: GameBoardCell[];
  selectCell: (cellIndex: number) => void;
  winner: Player;
  playersData: { player1: Player; player2: Player };
  resetBoard: () => void;
  addScore: (w: Player, l: Player) => void;
};

export const GameBoard: FC<ComponentProps> = ({
  boardData,
  selectCell,
  winner,
  playersData,
  resetBoard,
  addScore,
}) => {
  const { player1, player2 } = playersData;
  const navigate = useNavigate();

  const isATieMatch = useMemo(() => {
    return boardData.every(({ symbol }) => !!symbol) && !winner;
  }, [boardData, winner]);

  useEffect(() => {
    if (winner) {
      let loser = null;
      if (playersData.player1.id == winner.id) loser = playersData.player2;
      if (playersData.player2.id == winner.id) loser = playersData.player1;
      addScore(winner, loser);
    }
  }, [winner, playersData]);

  useEffect(() => {
    return () => resetBoard();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.playersInfo}>
        <div className={`${styles.playerScore} ${styles.p1}`}>
          <div>{player1.name}</div>
          <div>{player1.score}</div>
        </div>
        <div className={`${styles.playerScore} ${styles.p2}`}>
          <div>{player2.score}</div>
          <div>{player2.name}</div>
        </div>
      </div>
      <div className={styles.board}>
        {boardData.map((cell, i) => (
          <div
            data-testid="board-cell"
            key={i}
            className={styles.cell}
            onClick={() => selectCell(i)}
            style={{ pointerEvents: !cell.symbol && !winner ? 'initial' : 'none' }}
          >
            {(cell.symbol && cell.symbol === 'X' && <CloseIcon style={{ color: 'blue' }} />) ||
              (cell.symbol === 'O' && <CircleOutlinedIcon style={{ color: 'red' }} />)}
          </div>
        ))}
      </div>
      {winner && <div>{`The Winner is ${winner.name}`}</div>}
      {isATieMatch && <div> The Match is a Tie</div>}
      {(winner || isATieMatch) && (
        <Button variant="contained" onClick={resetBoard}>
          Rematch!
        </Button>
      )}

      <Button variant="outlined" color="info" onClick={() => navigate('/')}>
        Back to players selection
      </Button>
    </div>
  );
};
