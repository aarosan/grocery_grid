import React from 'react';
import MealForm from './MealForm';
import GroceryList from './GroceryList';
import MealIngredientList from './MealIngredientList';
import { useAuth } from '../App'; // Importing useAuth

const Sidebar = ({ 
  selectedMeal, onClose, ingredients, onIngredientChange, onDeleteIngredient, onCreateMeal, onEditMeal, onSaveGroceryList, onAddIngredients, mode, onSave
}) => {
  const { token } = useAuth(); // Get the token from context

  const handleSubmit = async (mealId, mealData) => {
    console.log('Submit clicked');
    console.log('mealData:', mealData);
    console.log('mealId:', mealId);
  
    try {
  
      if (mode === 'edit' && mealId) {
        await onEditMeal(mealData);
      } else {
        await onCreateMeal(mealData);
      }
  
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
    onClose();
  };
  
  const renderMealForm = () => (
    <MealForm
      meal={mode === 'edit' ? selectedMeal : { mealName: '', ingredients: [] }}
      onClose={onClose}
      onSave={onSave}
      mode={mode}
    />
  );

  const renderGroceryList = () => (
    <GroceryList
      ingredients={ingredients}
      onClose={onClose}
      onSave={onSaveGroceryList}
      onIngredientChange={onIngredientChange}
      onDeleteIngredient={onDeleteIngredient}
    />
  );

  const renderMealIngredientList = () => (
    <MealIngredientList
      selectedMeal={selectedMeal}
      onClose={onClose}
      onSave={onAddIngredients}
      onIngredientChange={onIngredientChange}
      onDeleteIngredient={onDeleteIngredient}
    />
  );

  const renderPlanPage = () => (
    <div>
      <h1>Plan Page</h1>
    </div>
  );

  return (
    <div className="sidebar">
      {mode === 'edit' || mode === 'add' ? renderMealForm() : null}
      {mode === 'grocery' ? renderGroceryList() : null}
      {mode === 'ingredients' ? renderMealIngredientList() : null}
      {mode === 'plan' ? renderPlanPage() : null}
    </div>
  );
};

export default Sidebar;
