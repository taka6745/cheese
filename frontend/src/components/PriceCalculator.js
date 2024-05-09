import React, { useState, useEffect } from 'react';
import './PriceCalculator.css'; 

const PriceCalculator = () => {
  const [cheeses, setCheeses] = useState([]);
  const [selectedCheeseId, setSelectedCheeseId] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [weight, setWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheeses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cheeses');
        if (!response.ok) {
          throw new Error('Could not fetch cheeses!');
        }
        const data = await response.json();
        setCheeses(data);
        setSelectedCheeseId(data[0]?.id || ''); 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheeses();
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!selectedCheeseId) return;

      try {
        const response = await fetch(`http://localhost:3000/api/cheeses/${selectedCheeseId}`);
        if (!response.ok) {
          throw new Error('Could not fetch cheese price!');
        }
        const data = await response.json();
        setCurrentPrice(data.pricePerKilo);
      } catch (error) {
        console.error('Error fetching price:', error);
        setCurrentPrice(0); 
      }
    };

    fetchPrice();
  }, [selectedCheeseId]); 

  const handleCheeseChange = (event) => {
    setSelectedCheeseId(event.target.value);
    resetPriceState();
  };

  const handleWeightChange = (event) => {
    setWeight(parseFloat(event.target.value) || 0);
  };

  const calculatePrice = () => {
    setTotalPrice(weight * currentPrice);
  };

  const resetPriceState = () => {
    setCurrentPrice(0);
    setTotalPrice(0);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="price-calculator">
      <h2>Price Calculator</h2>
      <label htmlFor="cheese-select">Cheese:</label>
      <select id="cheese-select" value={selectedCheeseId} onChange={handleCheeseChange}> 
        {cheeses.map((cheese) => (
          <option key={cheese.id} value={cheese.id}>
            {cheese.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="weight">Weight (kg):</label>
      <input
        type="number"
        id="weight"
        value={weight}
        onChange={handleWeightChange}
        step="0.01"
        min="0"
      />
      <br />
      <button onClick={calculatePrice}>Calculate</button>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default PriceCalculator;
