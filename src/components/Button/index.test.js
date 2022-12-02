import { render, screen } from '@testing-library/react';
import Button from './index';

test('renders Button', () => {
  render(<Button text="TestButton" />);
  const linkElement = screen.getByText(/TestButton/i);
  expect(linkElement).toBeInTheDocument();
});
