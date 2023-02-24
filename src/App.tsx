import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { GameBoard } from '@/pages/game-board';
import { ScoreBoard } from '@/pages/score-board';
import { PlayersForm } from '@/pages/players-form';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PlayersForm />} />
            <Route path="gameBoard" element={<GameBoard />} />
            <Route path="scoreBoard" element={<ScoreBoard />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
