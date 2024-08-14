import React from 'react';
import './Home.css'

const Meal = ({ meal, onEdit, onOpenIngredients }) => {
    return (
        <div className="meal-card" onClick={() => onOpenIngredients(meal)}>
            <div className="meal-card-button-container">
                <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(meal);
                        }} 
                        className="edit-button"
                    >
                        Edit
                    </button>
            </div>
            <h3 className="meal-title">{meal.mealName}</h3>
        </div>
    );
};

export default Meal;

