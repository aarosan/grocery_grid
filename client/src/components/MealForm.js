import React, { useState, useEffect } from 'react';
import MealTypeCheckboxes from './MealTypeCheckboxes';
import MealFormIngredientList from './MealFormIngredientList';
import '../style/Home.css'


const MealForm = ({ meal, onClose, onSave, mode }) => {
  const [mealName, setMealName] = useState(meal.mealName || '');
  const [ingredients, setIngredients] = useState(meal.ingredients || []);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);

  const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  useEffect(() => {
    if (mode === 'edit' && meal.mealType) {
      setSelectedMealTypes(meal.mealType);
    }
  }, [meal, mode]);

  const handleMealTypeChange = (mealType) => {
    setSelectedMealTypes((prevTypes) =>
      prevTypes.includes(mealType)
        ? prevTypes.filter((type) => type !== mealType)
        : [...prevTypes, mealType]
    );
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientInput = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const mealData = { mealName, ingredients, mealType: selectedMealTypes };
  
    try {
      if (mode === 'edit' && meal._id) {
        // Update an existing meal
        await onSave.onEditMeal({ _id: meal._id, ...mealData });
      } else if (mode === 'add') {
        // Create a new meal
        await onSave.onCreateMeal(mealData);
      }
    } catch (error) {
      console.error('Failed to save meal:', error);
    }
  
    onClose(); // Close the modal or panel after saving
  };
  

  return (
    <div className="edit-form">


      <h2 className="form-title">{mode === 'edit' ? 'Edit a Meal' : 'Add a Meal'}</h2>


      <form className="form-container" onSubmit={handleSubmit}>


        <div className="meal-name-container">
          <input 
              type="text" 
              placeholder='Meal Name'
              value={mealName} 
              onChange={(e) => setMealName(e.target.value)} 
            />
        </div>

        <div className="meal-checkboxes-container">        
          <MealTypeCheckboxes 
            mealTypes={mealTypes} 
            selectedMealTypes={selectedMealTypes} 
            onMealTypeChange={handleMealTypeChange} 
          />
        </div>

        <div className="ingredient-container">

        <MealFormIngredientList
          ingredients={ingredients}
          onIngredientChange={handleIngredientChange}
          onRemoveIngredient={removeIngredient}
        />
        
          <div className="ingredient-buttons">
            <button type="button" onClick={addIngredientInput}>Add Ingredient</button>
          </div>
        </div>
       
        <div className="form-buttons">
          <button type="button" onClick={onClose}>Home</button>
          <button type="submit">{mode === 'edit' ? 'Update Meal' : 'Add Meal'}</button>
        </div>

      </form>
    </div>
  );
};

export default MealForm;
