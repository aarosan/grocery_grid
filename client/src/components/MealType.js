import React from 'react';
import Meal from './Meal';
import './Home.css';

const MealType = ({ type, mealsData, onEdit, onOpenIngredients }) => {
    return (
        <div className="meal-type-container">
            <h2 className="meal-type-component-title">{type}</h2>
            {mealsData.length > 0 ? (
                <div className="meal-list">
                    {mealsData.map(meal => (
                        <Meal key={meal._id} meal={meal} onEdit={onEdit} onOpenIngredients={onOpenIngredients} />
                    ))}
                </div>
            ) : (
                <p>No meals found for this type.</p>
            )}
        </div>
    );
};

export default MealType;
