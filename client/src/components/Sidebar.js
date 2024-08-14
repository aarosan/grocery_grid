import React from 'react';
import EditForm from './EditForm';
import GroceryList from './GroceryList';
import IngredientList from './IngredientList';
import { useAuth } from '../App'; // Importing useAuth

const Sidebar = ({ selectedMeal, onClose, ingredients, onIngredientChange, onDeleteIngredient, onSaveMeal, onSaveGroceryList, onAddIngredients, mode }) => {
  const { token } = useAuth(); // Get the token from context

  const handleSubmit = async (mealId, mealData) => {
    console.log('Edit save clicked')
    console.log('mealdata', mealData)
    console.log('mealid', mealId)
    try {
      const url = mode === 'edit' 
      ? `http://localhost:3001/api/users/meals/${mealId}` // Use PUT for editing an existing meal
      : 'http://localhost:3001/api/users/meals'; // Use POST for creating a new meal

      const method = mode === 'edit' ? 'PUT' : 'POST';
      const response = await fetch(url, 
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(mealData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        onSaveMeal(result); // Trigger onSave callback with the result
      } else {
        console.error('Failed to save meal:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    onClose();
  };

  return (
    <div className="sidebar">
      {mode === 'edit' && selectedMeal && (
        <EditForm 
          meal={selectedMeal} 
          onClose={onClose} 
          onSave={(mealData) => {
            handleSubmit(selectedMeal._id, mealData);
            onSaveMeal(mealData); // Save the meal using the meal save function
        }}
          mode={mode}
        />
      )}
      {mode === 'add' && (
        <EditForm 
          meal={{ mealName: '', ingredients: [] }} 
          onClose={onClose} 
          onSave={(mealData) => {
            handleSubmit(null, mealData);
            onSaveMeal(mealData); // Save the meal using the meal save function
        }} 
          mode={mode}
        />
      )}
      {mode === 'grocery' && (
        <GroceryList 
          ingredients={ingredients}
          onClose={onClose}
          onSave={onSaveGroceryList}
          onIngredientChange={onIngredientChange}
          onDeleteIngredient={onDeleteIngredient}
        />
      )}
      {mode === 'ingredients' && selectedMeal && (
        <IngredientList 
          selectedMeal={selectedMeal}
          onClose={onClose}
          onSave={onAddIngredients}
          onIngredientChange={onIngredientChange}
          onDeleteIngredient={onDeleteIngredient}
        />
      )}
    </div>
  );
};

export default Sidebar;
