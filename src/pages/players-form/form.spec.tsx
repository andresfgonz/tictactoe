import { PlayersForm, ComponentProps } from './players-from';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Players Form', () => {
  const setPlayers = vi.fn();

  beforeEach(() => {
    setPlayers.mockClear();
    render(<PlayersForm setPlayers={setPlayers} />);
  });

  it('should show errorMessages when inputs are empty', async () => {
    const submitButton = screen.getByTestId('submitButton');
    await user.click(submitButton);

    const errorMessages = await screen.findAllByText('Required field');
    expect(errorMessages).toHaveLength(2);
  });

  it('should call set Players function when the form is filled', async () => {
    const p1Input = screen.getByTestId('player1input');
    const p2Input = screen.getByTestId('player2input');
    const submitButton = screen.getByTestId('submitButton');

    const p1Name = 'Andres';
    const p2Name = 'Felipe';

    await user.type(p1Input, p1Name);
    await user.type(p2Input, p2Name);
    await user.click(submitButton);

    await waitFor(() => {
      expect(setPlayers).toHaveBeenCalled();
    });

    expect(setPlayers).toHaveBeenCalledWith(p1Name, p2Name);
  });
});
