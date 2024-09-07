import React, { useState, useEffect } from 'react';
import './Home.css';


const EditForm = ({ meal, onClose, onSave, mode }) => {
  console.log("received meal:", meal);
  const [mealName, setMealName] = useState(meal.mealName || '');
  const [ingredients, setIngredients] = useState(meal.ingredients || []);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);

  const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  useEffect(() => {
    console.log("useEffect", meal);
    if (mode === 'edit' && meal.mealType) {
      setSelectedMealTypes(meal.mealType);
    }
  }, [meal, mode]);

  useEffect(() => {
    console.log("Updated selectedMealTypes", selectedMealTypes);
  }, [selectedMealTypes]);

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

  const removeIngredientInput = () => {
    setIngredients(ingredients.slice(0, -1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    console.log('Submit clicked');
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
      console.error('Error in handleSubmit:', error);
    }
  
    onClose(); // Close the modal or panel after saving
  };
  

  return (
    <div className="edit-form">


      <h2 className="form-title">{mode === 'edit' ? 'Edit a Meal' : 'Add a Meal'}</h2>


      <form className="form-container" onSubmit={handleSubmit}>

        <div className="meal-type-container">

          <div className="meal-type-container-title">Meal Type:</div>

          <div className='meal-type-checkbox-container'>
            {mealTypes.map((type) => (

              <div key={type} className="meal-type-checkboxes">

                <span className="meal-checkbox-title">{type}</span>

                <input
                  type="checkbox"
                  checked={selectedMealTypes.includes(type)}
                  onChange={() => handleMealTypeChange(type)}
                />

              </div>

            ))}
          </div>

        </div>


        <div className="meal-name-container">
          <label className="meal-name-title">
            Meal Name:
            <input 
              type="text" 
              value={mealName} 
              onChange={(e) => setMealName(e.target.value)} 
            />
          </label>
        </div>
        
        <div className="ingredient-container">

          <label className="ingredient-label">Ingredients:</label>

          <div className="ingredient-buttons">

            {mode === 'add' && (
                <button type="button" onClick={addIngredientInput}>Add Ingredient</button>
            )}
            {mode === 'add' && (
                <button type="button" onClick={removeIngredientInput}>Delete Ingredient</button>
            )}

          </div>

          <div className="ingredient-inputs">
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              placeholder={`Ingredient ${index + 1}`}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            ))}
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

export default EditForm;
