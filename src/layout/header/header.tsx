import { FC } from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TicTacToe</h1>
      <div className={styles.linksContainer}>
        <div>
          <Link to="/">Play</Link>
        </div>
        <div>
          <Link to="scoreBoard">ScoreBoard</Link>
        </div>
      </div>
    </div>
  );
};
