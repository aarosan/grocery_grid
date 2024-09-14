import React from 'react';

const MealFormIngredientList = ({ ingredients, onIngredientChange, onRemoveIngredient }) => (
    <div className="ingredient-container">
        <label className="ingredient-label">Ingredients:</label>
        <div className="ingredient-inputs">
            {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                    <input
                        type="text"
                        value={ingredient}
                        placeholder={`Ingredient ${index + 1}`}
                        onChange={(e) => onIngredientChange(index, e.target.value)}
                    />
                    <button 
                        type="button" 
                        className="delete-ingredient-button" 
                        onClick={() => onRemoveIngredient(index)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default MealFormIngredientList;
