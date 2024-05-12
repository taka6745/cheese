import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateCheese.css';

function UpdateCheese({ onUpdateSuccess }) {
  const [cheeseIds, setCheeseIds] = useState([]);
  const [selectedCheeseId, setSelectedCheeseId] = useState('');
  const [cheese, setCheese] = useState({
    name: '',
    pricePerKilo: '',
    color: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch all cheese IDs
  useEffect(() => {
    const fetchCheeseIds = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/cheeses');
        const ids = response.data.map(cheese => cheese.id);
        setCheeseIds(ids);
      } catch (error) {
        setError('Failed to fetch cheese IDs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheeseIds();
  }, []);

  // Fetch details of the selected cheese
  useEffect(() => {
    if (!selectedCheeseId) return;

    const fetchCheeseDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/cheeses/${selectedCheeseId}`);
        setCheese(response.data);
      } catch (error) {
        setError('Failed to fetch cheese details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheeseDetails();
  }, [selectedCheeseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheese((prevCheese) => ({
      ...prevCheese,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.put(`http://localhost:3000/api/cheeses/${selectedCheeseId}`, cheese, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage('Cheese updated successfully!');
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      setError('Failed to update cheese.');
    }
  };

  return (
    <div className="update-cheese">
      <h2>Update Cheese</h2>
      <div>
        <label htmlFor="cheeseId">Select Cheese to Update:</label>
        <select
          id="cheeseId"
          value={selectedCheeseId}
          onChange={(e) => setSelectedCheeseId(e.target.value)}
        >
          <option value="" disabled>Select a cheese</option>
          {cheeseIds.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      {selectedCheeseId && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={cheese.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Price Per Kilo:</label>
            <input
              type="number"
              name="pricePerKilo"
              value={cheese.pricePerKilo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={cheese.color}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={cheese.image}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Cheese</button>
        </form>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UpdateCheese;
