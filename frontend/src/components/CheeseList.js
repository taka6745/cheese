import React, { useState, useEffect } from 'react';
import './CheeseList.css';

const CheeseList = () => {
    const [cheeses, setCheeses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheeses = async () => {
            setIsLoading(true);
            // Using a timestamp to prevent caching of the GET request.
            const response = await fetch(`http://localhost:3000/api/cheeses?timestamp=${new Date().getTime()}`);
            try {
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
    }, []); // The empty array means this effect runs once per component mount.

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="cheese-list">
            {cheeses.map((cheese) => ( // Removed the slice to display all cheeses
                <div key={cheese.id} className="cheese-card">
                    <img src={`http://localhost:3000/img/${cheese.image}`} alt={cheese.name} />
                    <div className="cheese-info">
                        <p className="cheese-name">{cheese.name}</p>
                        <p>Price per kilo: {cheese.pricePerKilo}</p>
                        <p>Color: {cheese.color}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheeseList;
