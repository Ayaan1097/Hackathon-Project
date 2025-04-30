import { render, screen } from '@testing-library/react';
import App from './App';

test('renders property search portal title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Unified Property Search Portal/i);
  expect(titleElement).toBeInTheDocument();
});
