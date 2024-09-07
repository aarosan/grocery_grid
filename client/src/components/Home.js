import React, { useEffect, useState } from 'react';
import './Home.css'; // Import your Home CSS file
import MealType from './MealType';
import Sidebar from './Sidebar';

const Home = ({ signOut }) => {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [groceryList, setGroceryList] = useState([]);
    const [mode, setMode] = useState(null);

    const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

    useEffect(() => {
        fetchMeals();
        loadGroceryList();
    }, []);

    const fetchMeals = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/users/meals', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const mealsData = await response.json();
            setMeals(mealsData);
        } catch (error) {
            console.error('Error fetching meals:', error);
            setError('Failed to fetch meals.');
        }
    };

    const openForm = (meal = null, formMode) => {
        setSelectedMeal(meal);
        setMode(formMode);
        if (formMode === 'grocery') {
            loadGroceryList();
        }
    };

    const closeSidebar = () => {
        setMode(null);
        setSelectedMeal(null);
    };

    const loadGroceryList = () => {
        const storedList = JSON.parse(localStorage.getItem('groceryList')) || [];
        const formattedGroceryList = storedList.map(item => ({
            name: item.name || item,
            checked: item.checked || false // Set default checked to false
        }));
        setGroceryList(formattedGroceryList);
    };

// Function to delete an ingredient from the grocery list
    const deleteIngredient = (ingredientName) => {
        const updatedGroceryList = groceryList.filter(item => item.name !== ingredientName);
        setGroceryList(updatedGroceryList);
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));
    };

    const addIngredientsToGroceryList = (selectedIngredients) => {
        const newIngredients = selectedIngredients.filter(ingredient => 
            !groceryList.some(item => item.name === ingredient) // Avoid duplicates
        ).map(ingredient => ({ name: ingredient, checked: false })); // Set default checked to false
    
        const updatedGroceryList = [...groceryList, ...newIngredients];
        setGroceryList(updatedGroceryList);
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList)); // Save to local storage
    };

    // Modify the saveGroceryList function if necessary to utilize the update function
    const saveGroceryList = () => {
        // Save the updated grocery list (this can also be done in handleIngredientChange)
        const updatedGroceryList = groceryList.map(item => ({ name: item.name, checked: item.checked }));
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));
        closeSidebar();
    };

    const handleIngredientChange = (ingredientName) => {
        const updatedGroceryList = groceryList.map(item => 
            item.name === ingredientName 
                ? { ...item, checked: !item.checked } 
                : item
        );
        setGroceryList(updatedGroceryList);
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList)); // Save updated list to local storage
    };

    const saveNewMeal = async (mealData) => {
        console.log('MEAL DATA BEING SENT FROM EDITFORM', mealData)  
        const { _id, user, __v, ...dataToSend } = mealData;      
        try {
            const token = localStorage.getItem('token');
            const method = _id ? 'PUT' : 'POST'; // Determine method based on presence of _id
            const url = _id 
                ? `http://localhost:3001/api/users/meals/${_id}` 
                : 'http://localhost:3001/api/users/meals';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
             const updatedMeal = await response.json();
             console.log('New meal added:', updatedMeal);

             setMeals((prevMeals) => {
                if (_id) {
                    // Update the existing meal
                    return prevMeals.map((meal) => 
                        meal._id === _id ? updatedMeal : meal
                    );
                } else {
                    // Add a new meal
                    return [...prevMeals, updatedMeal];
                }
            });

            closeSidebar();
        } catch (error) {
            console.error('Error saving meal:', error);
            setError('Failed to save meal.');
        }
    };    

    const deleteMeal = async (meal) => {

        try {
            console.log('deleteMeal function invoked:', meal);
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/api/users/meals/${meal._id}`, {
                method: 'DELETE',  // Change the method to DELETE      
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setMeals((prevMeals) => prevMeals.filter((m) => m._id !== meal._id));
        } catch (error) {
            console.error('Error deleting meal:', error);
            setError('Failed to delete meal.');
        }
    }


    return (
        <div className="home-container">


            <div className="header-container">
                <div className="header-actions">
                    <button onClick={signOut} className="sign-out-button">
                    Sign Out
                    </button>
                    <button onClick={() => openForm(null, 'add')} className="add-meal-button">Add Meal</button>
                    <button onClick={() => openForm(null, 'grocery')} className="view-list-button">View List</button>
                </div>
            </div>


            {error && <p className="error-message">{error}</p>}

            {mealTypes.map(type => (
                <MealType 
                    key={type} 
                    type={type} 
                    mealsData={meals.filter(meal => meal.mealType.includes(type))} 
                    onEdit={(meal) => openForm(meal, 'edit')} 
                    onDelete={(meal) => deleteMeal(meal)}
                    onOpenIngredients={(meal) => openForm(meal, 'ingredients')}
                />
            ))}
            
            {mode && (
                <div className="sidebar-overlay">
                    <Sidebar 
                        selectedMeal={selectedMeal} 
                        onClose={closeSidebar} 
                        ingredients={groceryList} 
                        onIngredientChange={handleIngredientChange} 
                        onDeleteIngredient={deleteIngredient}
                        onSaveMeal={saveNewMeal} // Save meal function
                        onSaveGroceryList={saveGroceryList} // Save grocery list function
                        onAddIngredients={addIngredientsToGroceryList}
                        mode={mode}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
