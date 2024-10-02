import React, { useEffect, useState } from 'react';
import '../style/Home.css';
import { useNavigate } from 'react-router-dom';
import mealsData from '../data/meals.json';
import groceryListData from '../data/groceryList.json';
import MealType from '../components/MealType';
import Sidebar from '../components/Sidebar';

const Pilot = () => {
    const [meals, setMeals] = useState({});
    const [groceryList, setGroceryList] = useState(groceryListData);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [mode, setMode] = useState(null);

    const navigate = useNavigate();
    const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

    // Group meals by mealType
    useEffect(() => {
        const groupedMeals = mealsData.reduce((acc, meal) => {
            const { mealType } = meal;
            if (!acc[mealType]) {
                acc[mealType] = [];
            }
            acc[mealType].push(meal);
            return acc;
        }, {});
        setMeals(groupedMeals); // Set the grouped meals
        setGroceryList(groceryListData);
    }, []);

    const openForm = (meal = null, formMode) => {
        setSelectedMeal(meal);
        setMode(formMode);
    };

    const closeSidebar = () => {
        setMode(null);
        setSelectedMeal(null);
    };

    const createMeal = (mealData) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [mealData.mealType]: [...(prevMeals[mealData.mealType] || []), mealData],
        }));
        closeSidebar();
    };

    const updateMeal = (mealData) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [mealData.mealType]: prevMeals[mealData.mealType].map((meal) => (meal.id === mealData.id ? mealData : meal)),
        }));
        closeSidebar();
    };

    const deleteMeal = (mealData) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [mealData.mealType]: prevMeals[mealData.mealType].filter((meal) => meal.id !== mealData.id),
        }));
        closeSidebar();
    };

    const handleIngredientChange = (ingredient) => {
        setGroceryList((prevList) =>
            prevList.map((item) =>
                item.name === ingredient.name ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const addIngredientsToGroceryList = (ingredients) => {
        setGroceryList([...groceryList, ...ingredients]);
    };

    const mealPlan = () => {
        navigate('/pilot-plan');
    };

    return (
        <div className="home-container">
            <div className="header-container">
                <div className="header-actions">
                    <button onClick={() => openForm(null, 'add')} className="add-meal-button">Add Meal</button>
                    <button onClick={() => openForm(null, 'grocery')} className="view-list-button">View List</button>
                    <button onClick={mealPlan} className="meal-plan-button">Meal Plan</button>
                </div>
            </div>

            {mealTypes.map(type => (
                <MealType 
                    key={type} 
                    type={type} 
                    mealsData={meals[type] || []} // Pass meals for that type
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
                        onSave={{
                            onCreateMeal: createMeal,
                            onEditMeal: updateMeal,
                        }}
                        onIngredientChange={handleIngredientChange} 
                        onAddIngredients={addIngredientsToGroceryList}
                        mode={mode}
                    />
                </div>
            )}
        </div>
    );
};

export default Pilot;
