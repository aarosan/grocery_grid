import { useState, useEffect } from 'react';

const apiUrl = process.env.REACT_APP_HEROKU_URL || 'http://localhost:5000';

export const useMeals = () => {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${apiUrl}/api/users/meals`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const mealsData = await response.json();
                setMeals(mealsData);
            } catch (error) {
                console.error('Error fetching meals:', error);
                setError('Failed to fetch meals.');
            }
        };

        fetchMeals();
    }, []);

    return { meals, error, setMeals };
};
