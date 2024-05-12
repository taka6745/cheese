import React, { useState } from 'react';
import axios from 'axios';
import './CreateCheese.css';

function CreateCheese() {
  const [name, setName] = useState('');
  const [pricePerKilo, setPricePerKilo] = useState('');
  const [color, setColor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cheeseData = {
      name,
      pricePerKilo,
      color,
      image: imageUrl
    };

    try {
      const response = await axios.post('http://localhost:3000/api/cheeses', cheeseData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setMessage('Cheese created successfully!');
    } catch (error) {
      console.error('There was an error creating the cheese!', error);
      setMessage('Error creating cheese.');
    }
  };

  return (
    <div className="create-cheese">
      <h2>Create New Cheese</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price Per Kilo:</label>
          <input
            type="number"
            value={pricePerKilo}
            onChange={(e) => setPricePerKilo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Cheese</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateCheese;
