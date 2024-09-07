import React from 'react';
import EditForm from './EditForm';
import GroceryList from './GroceryList';
import IngredientList from './IngredientList';
import { useAuth } from '../App'; // Importing useAuth

const Sidebar = ({ selectedMeal, onClose, ingredients, onIngredientChange, onDeleteIngredient, onCreateMeal, onEditMeal, onSaveGroceryList, onAddIngredients, mode }) => {
  const { token } = useAuth(); // Get the token from context

  const handleSubmit = async (mealId, mealData) => {
    console.log('Submit clicked');
    console.log('mealData:', mealData);
    console.log('mealId:', mealId);
  
    try {
      let savedMeal;
  
      if (mode === 'edit' && mealId) {
        savedMeal = await onEditMeal(mealData);
      } else {
        savedMeal = await onCreateMeal(mealData);
      }
  
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
    onClose();
  };
  

  const saveActions = {
    onEditMeal: async (mealData) => {
      return await handleSubmit(selectedMeal._id, mealData);
    },
    onCreateMeal: async (mealData) => {
      return await handleSubmit(null, mealData);
    }
  };
  

  return (
    <div className="sidebar">
      {mode === 'edit' && selectedMeal && (
        <EditForm 
          meal={selectedMeal} 
          onClose={onClose} 
          onSave={saveActions} 
          mode={mode}
        />
      )}
      {mode === 'add' && (
        <EditForm 
          meal={{ mealName: '', ingredients: [] }} 
          onClose={onClose} 
          onSave={saveActions} 
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
