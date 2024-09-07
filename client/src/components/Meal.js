import React from 'react';
import './Home.css'

const Meal = ({ meal, onEdit, onDelete, onOpenIngredients }) => {
    
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
                <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(meal);
                        }} 
                        className="edit-button"
                    >
                        Delete
                </button>
            </div>
            <h3 className="meal-title">{meal.mealName}</h3>
        </div>
    );
};

export default Meal;

