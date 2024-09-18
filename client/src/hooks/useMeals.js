import { useState, useEffect } from 'react';

const apiUrl = process.env.REACT_APP_HEROKU_URL || 'http://localhost:5000';

export const useMeals = () => {
    const [meals, setMeals] = useState({
        Breakfast: [],
        Lunch: [],
        Snack: [],
        Dinner: []
    });
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
    
                // Assuming mealsData is an array of meals, group them by mealType
                const categorizedMeals = mealsData.reduce((acc, meal) => {
                    const { mealType } = meal;
                    if (!acc[mealType]) {
                        acc[mealType] = [];
                    }
                    acc[mealType].push(meal);
                    return acc;
                }, {});
    
                setMeals(categorizedMeals);
                setError(null);
            } catch (error) {
                setError(`Failed to fetch meals: ${error.message}`);
            }
        };
    
        fetchMeals();
    }, []);

    return { meals, error, setMeals };
};
