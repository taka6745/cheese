import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteCheese.css';

function DeleteCheese({ onDeleteSuccess }) {
  const [cheeses, setCheeses] = useState([]);
  const [selectedCheeseId, setSelectedCheeseId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch all cheese details
  useEffect(() => {
    const fetchCheeses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/cheeses');
        setCheeses(response.data);
      } catch (error) {
        setError('Failed to fetch cheeses.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheeses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await axios.delete(`http://localhost:3000/api/cheeses/${selectedCheeseId}`);
      if (response.status === 204) {
        setSuccessMessage('Cheese deleted successfully!');
        // Remove the deleted cheese from the list
        setCheeses(cheeses.filter((cheese) => cheese._id !== selectedCheeseId));
        setSelectedCheeseId(''); // Reset selection
        if (onDeleteSuccess) onDeleteSuccess();
      } else {
        setError('Failed to delete cheese.');
      }
    } catch (error) {
      setError('Failed to delete cheese.');
    }
  };

  return (
    <div className="delete-cheese">
      <h2>Delete Cheese</h2>
      <div>
        <label htmlFor="cheeseId">Select Cheese to Delete:</label>
        <select
          id="cheeseId"
          value={selectedCheeseId}
          onChange={(e) => setSelectedCheeseId(e.target.value)}
        >
          <option value="" disabled>Select a cheese</option>
          {cheeses.map((cheese) => (
            <option key={cheese._id} value={cheese._id}>{cheese.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Delete Cheese</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default DeleteCheese;
