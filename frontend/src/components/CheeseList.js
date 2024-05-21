import React, { useState, useEffect } from 'react';
import './CheeseList.css';

const CheeseList = () => {
  const [cheeses, setCheeses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheeses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/cheeses?timestamp=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error('Could not fetch cheeses!');
        }
        const data = await response.json();
        setCheeses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheeses();
  }, []);

  const handleImageError = (e) => {
    if (!e.target.src.includes('default-image-url.jpg')) {
      e.target.src = 'default-image-url.jpg';
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="cheese-list">
      {cheeses.map((cheese) => {
        const imageUrl = cheese.image.startsWith('http') ? cheese.image : `http://localhost:3000/img/${cheese.image}`;
        return (
          <div key={cheese._id} className="cheese-card">
            <img src={imageUrl} alt={cheese.name} onError={handleImageError} />
            <div className="cheese-info">
              <p className="cheese-name">{cheese.name}</p>
              <p>Price per kilo: {cheese.pricePerKilo}</p>
              <p>Color: {cheese.color}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheeseList;
