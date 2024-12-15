import { render, screen, fireEvent } from '@testing-library/react';
import GameOver from './GameOver';
import '@testing-library/jest-dom';

test('renders GameOver with winner message', () => {
  render(<GameOver winner="Player 1" restart={() => {}} />);

  expect(screen.getByText(/Game Over/)).toBeInTheDocument();

  expect(screen.getByText('Win Player 1!')).toBeInTheDocument();
});

test('renders GameOver without winner message', () => {
  render(<GameOver winner={undefined} restart={() => {}} />);

  expect(screen.getByText(/Game Over/)).toBeInTheDocument();

  expect(screen.queryByText(/Win/)).not.toBeInTheDocument();
});

test('calls restart function when button is clicked', () => {
  const restartMock = jest.fn();
  render(<GameOver winner="Player 1" restart={restartMock} />);

  const button = screen.getByText('Restart');
  fireEvent.click(button);

  expect(restartMock).toHaveBeenCalledTimes(1);
});
