import React from 'react';
import Meal from './Meal';
import '../style/Home.css'

const MealType = ({ type, mealsData, onEdit, onDelete, onOpenIngredients }) => {

    return (
        <div className="meal-type-container">
            <div className="meal-type-header">
                <h2 className="meal-type-component-title">{type}</h2>
            </div>

            {mealsData.length > 0 ? (
                <div className="meal-list">
                    {mealsData.map(meal => (
                        <Meal key={meal._id} meal={meal} onEdit={onEdit} onDelete={onDelete} onOpenIngredients={onOpenIngredients} />
                    ))}
                </div>
            ) : (
                <p>No meals found for this type.</p>
            )}
        </div>
    );
};

export default MealType;
