// App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';  // Adjust according to actual path

test('renders loading texts for both components', () => {
  render(<App />);
  const loadingMessages = screen.getAllByText(/Loading.../i);
  expect(loadingMessages.length).toBe(2); // Expect two loading texts
});
