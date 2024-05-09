// CheeseList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CheeseList from './components/CheeseList';
import fetchMock from 'jest-fetch-mock';


import App from './App';  

beforeEach(() => {
  fetchMock.resetMocks();
});

test('displays cheeses correctly after fetching', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Cheddar', pricePerKilo: '15', color: 'Yellow', image: 'cheddar.jpg' }]));
  render(<CheeseList />);
  const cheeseName = await screen.findByText('Cheddar');
  expect(cheeseName).toBeInTheDocument();
});
