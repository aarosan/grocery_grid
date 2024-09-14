import React, { useState, useEffect } from 'react';

const MealIngredientList = ({ selectedMeal, onClose, onSave }) => {
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    if (selectedMeal) {
      const initialChecked = selectedMeal.ingredients.map(() => true);
      setCheckedIngredients(initialChecked);
    }
  }, [selectedMeal]);

  const handleIngredientChange = (ingredient, index) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  return (
    <div className="ingredients-list">

      <h2 className="meal-name">{selectedMeal.mealName}</h2>

      <div className="ingredient-checkboxes">
        {selectedMeal.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-list-checkbox">
            
            <span>{ingredient}</span>

            <input
              type="checkbox"
              checked={checkedIngredients[index]}
              onChange={() => handleIngredientChange(ingredient, index)}
              className='individual-ingredient-checkbox'
            />
          </div>
        ))}
      </div>

      <div className="ingredients-list-buttons">
        <button onClick={onClose}>Home</button>
        <button onClick={() => {
                  const selected = selectedMeal.ingredients.filter((_, index) => checkedIngredients[index]);
                  onSave(selected); // Pass selected ingredients to the save function
                  onClose();
              }}>
                  Add to List
        </button>
      </div>
    </div>
  );
};

export default MealIngredientList;
