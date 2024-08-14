import React from 'react';

const GroceryList = ({ ingredients, onClose, onSave, onIngredientChange, onDeleteIngredient }) => (
  <div className="grocery-list">
    
    <h2 className="grocery-list-title">Grocery List</h2>
    <div className="ingredient-checkboxes">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-loop">
          <span className="ingredient-loop-title">{ingredient.name}</span>
          <button onClick={() => onDeleteIngredient(ingredient.name)} className="delete-button">Delete</button>
        </div>
      ))}
    </div>

    <div className="grocery-list-buttons">
      <button onClick={onClose}>Home</button>
      <button onClick={onSave}>Save</button> 
    </div>

  </div>
);

export default GroceryList;
