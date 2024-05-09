import React from 'react';
import './App.css'; 
import CheeseList from './components/CheeseList';
import PriceCalculator from './components/PriceCalculator';

function App() {
  return (
    <div className="App">
      <h1>PZ Cheeseria</h1>
      <CheeseList />
      <PriceCalculator />
    </div>
  );
}

export default App;
