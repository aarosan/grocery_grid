import React, { useEffect, useState } from 'react';
import '../style/Home.css'
import MealType from '../components/MealType';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useMeals } from '../hooks/useMeals';
import { useGroceryList } from '../hooks/useGroceryList';

const apiUrl = process.env.REACT_APP_HEROKU_URL || 'http://localhost:5000';

const Home = ({ signOut }) => {
    const { meals, error, setMeals } = useMeals();
    const { groceryList, loadGroceryList, addIngredientsToGroceryList, handleIngredientChange, deleteIngredient, saveGroceryList } = useGroceryList();

    const [selectedMeal, setSelectedMeal] = useState(null);
    const [mode, setMode] = useState(null);

    const navigate = useNavigate();
    const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

    useEffect(() => {
        loadGroceryList();
    }, [loadGroceryList]);

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

    const createMeal = async (mealData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/api/users/meals`, {
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
        }
    };
    
    const updateMeal = async (mealData) => {
        console.log('updateMeal function invoked:', mealData);
        const { _id, mealType, mealName, ingredients, user } = mealData;
        console.log('dataToSend:', { mealType, mealName, ingredients, user });
        const token = localStorage.getItem('token');
        
        try {
          const response = await fetch(`${apiUrl}/api/users/meals/${_id}`, {
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
        }
    };
    
    const deleteMeal = async (meal) => {

        try {
            console.log('deleteMeal function invoked:', meal);
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/api/users/meals/${meal._id}`, {
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
        }
    }

    const mealPlan = async () => {
        navigate('/plan');
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
                    <button onClick={mealPlan} className="meal-plan-button">Meal Plan</button>
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