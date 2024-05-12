import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteCheese.css';

function DeleteCheese({ onDeleteSuccess }) {
  const [cheeseIds, setCheeseIds] = useState([]);
  const [selectedCheeseId, setSelectedCheeseId] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.delete(`http://localhost:3000/api/cheeses/${selectedCheeseId}`);
      setSuccessMessage('Cheese deleted successfully!');
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      setError('Failed to delete cheese.');
    }
  };

  return (
    <div className="delete-cheese">
      <h2>Delete Cheese</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cheeseId">Select Cheese to Delete:</label>
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
        <button type="submit">Delete Cheese</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default DeleteCheese;
