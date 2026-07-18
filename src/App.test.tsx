import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

test('renderiza a home com o botão JOGAR', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(await screen.findByText(/JOGAR/)).toBeInTheDocument();
});
