import { FC } from 'react';
import { Header } from './header';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';

export const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
