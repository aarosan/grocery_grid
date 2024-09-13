import React from 'react';

const MealTypeCheckboxes = ({ mealTypes, selectedMealTypes, onMealTypeChange }) => (
    <div className='meal-type-checkbox-container'>
        {mealTypes.map((type) => (
            <div key={type} className="meal-type-checkboxes">
                <span className="meal-checkbox-title">{type}</span>
                <input
                    type="checkbox"
                    checked={selectedMealTypes.includes(type)}
                    onChange={() => onMealTypeChange(type)}
                />
            </div>
        ))}
    </div>
);

export default MealTypeCheckboxes;
