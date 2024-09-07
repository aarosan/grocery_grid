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

    const createMeal = async (mealData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3001/api/users/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(mealData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const newMeal = await response.json();
            setMeals((prevMeals) => [...prevMeals, newMeal]);
            closeSidebar();
        } catch (error) {
            console.error('Error creating meal:', error);
            setError('Failed to create meal.');
        }
    };
    
    const updateMeal = async (mealData) => {
        console.log('updateMeal function invoked:', mealData);
        const { _id, mealType, mealName, ingredients, user } = mealData;
        console.log('dataToSend:', { mealType, mealName, ingredients, user });
        const token = localStorage.getItem('token');
        
        try {
          const response = await fetch(`http://localhost:3001/api/users/meals/${_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ mealType, mealName, ingredients, user }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const updatedMeal = await response.json();
          setMeals((prevMeals) =>
            prevMeals.map((meal) => (meal._id === _id ? updatedMeal : meal))
          );
          closeSidebar();
        } catch (error) {
          console.error('Error updating meal:', error);
          setError('Failed to update meal.');
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
                    onCreateMeal={createMeal} 
                    onEditMeal={updateMeal} // Ensure this is correctly passed
                    onSaveGroceryList={saveGroceryList}
                    onAddIngredients={addIngredientsToGroceryList}
                    mode={mode}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
