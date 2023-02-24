import { GameBoard, ComponentProps } from './game-board';
import { render, RenderResult, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { v4 as uuid } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { expect } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  default: vi.fn(),
  useNavigate: () => mockNavigate,
}));

describe('GameBoard', () => {
  let component: RenderResult;
  const boardData: GameBoardCell[] = [
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
    { symbol: null },
  ];

  const selectCell = vi.fn();
  const resetBoard = vi.fn();
  const addScore = vi.fn();
  const winner: Player = null;

  const player1: Player = { id: uuid(), name: 'Andres', score: 0 };
  const player2: Player = { id: uuid(), name: 'Felipe', score: 0 };

  const playersData = {
    player1,
    player2,
  };

  const props: ComponentProps = {
    boardData,
    resetBoard,
    winner,
    playersData,
    selectCell,
    addScore,
  };

  beforeEach(() => {
    addScore.mockClear();
    selectCell.mockClear();
    resetBoard.mockClear();
    component = render(<GameBoard {...props} />);
  });

  it('should render initial empty cells', () => {
    const cells = screen.getAllByTestId('board-cell');
    expect(cells).toHaveLength(boardData.length);
  });

  it('should call selectCell function', async () => {
    const cells = screen.getAllByTestId('board-cell');
    await user.click(cells[0]);

    expect(selectCell).toHaveBeenCalledWith(0);
  });

  it('should show feedback message whe a winner is provided', async () => {
    const winnerText = `The Winner is ${player1.name}`;
    expect(screen.queryByText(winnerText)).not.toBeInTheDocument();
    component.rerender(<GameBoard {...props} winner={player1} />);
    expect(screen.getByText(winnerText)).toBeInTheDocument();
  });

  it('should render X and O icons on cells', () => {
    expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('CircleOutlinedIcon')).not.toBeInTheDocument();
    const uBoardData = [...boardData];
    uBoardData[0].symbol = 'X';
    uBoardData[1].symbol = 'O';
    component.rerender(<GameBoard {...props} boardData={uBoardData} />);
    const cells = screen.getAllByTestId('board-cell');
    expect(cells[0]).toContainElement(screen.getByTestId('CloseIcon'));
    expect(cells[1]).toContainElement(screen.getByTestId('CircleOutlinedIcon'));
  });

  it('should render the rematch button and call reset board function', async () => {
    expect(screen.queryByRole('button', { name: /REMATCH!/i })).not.toBeInTheDocument();
    component.rerender(<GameBoard {...props} winner={player2} />);
    const rematchButton = screen.getByRole('button', { name: /REMATCH!/i });
    expect(rematchButton).toBeInTheDocument();

    await user.click(rematchButton);
    expect(resetBoard).toHaveBeenCalled();
  });

  it('should addScore when a winner is provided', () => {
    expect(addScore).not.toHaveBeenCalled();
    component.rerender(<GameBoard {...props} winner={player2} />);
    expect(addScore).toHaveBeenCalledWith(player2, player1);
  });

  it('should navigate back to players selection', async () => {
    const navigateButton = screen.getByRole('button', { name: /Back to players selection/i });
    expect(navigateButton).toBeInTheDocument();

    await user.click(navigateButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
