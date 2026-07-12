import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza a home com o botão JOGAR', async () => {
  render(<App />);
  expect(await screen.findByText(/JOGAR/)).toBeInTheDocument();
});
