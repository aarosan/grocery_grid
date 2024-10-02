import React, { useEffect, useState } from "react";
import "../style/Plan.css";
import { Link } from "react-router-dom";
import mealData from "../data/meals.json";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

const PilotPlan = () => {
  const [mealPlan, setMealPlan] = useState(() => {
    const savedPlan = localStorage.getItem("mealPlan");
    return savedPlan
      ? JSON.parse(savedPlan)
      : daysOfWeek.reduce((acc, day) => {
          acc[day] = { Breakfast: "", Lunch: "", Snack: "", Dinner: "" };
          return acc;
        }, {});
  })

  const [editing, setEditing] = useState({ day: null, mealType: null });

  // Transform meals dictionary into an object with meal types as keys
  const transformedMeals = mealTypes.reduce((acc, type) => {
    // Access the meal type's array from the meals object
    const mealArray = mealData.filter(meal => meal.mealType === type);
    // Map the array to get meal names
    acc[type] = mealArray.map(meal => meal.mealName);
    return acc;
  }, {});

  // Load meal plan from localStorage
  useEffect(() => {
    
    const savedPlan = localStorage.getItem("mealPlan");
    if (savedPlan) {
      setMealPlan(JSON.parse(savedPlan));
    }
  }, []);

  const handleMealClick = (day, mealType) => {
    setEditing({ day, mealType });
  };

  const handleSaveMeal = (meal) => {
    const { day, mealType } = editing;
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
        [mealType]: meal,
      },
    }));
    setEditing({ day: null, mealType: null });
  };

  const handleClearMeal = (day, mealType) => {
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
        [mealType]: "",
      },
    }));
    setEditing({ day: null, mealType: null });
  };

  const handleCloseModal = () => {
    setEditing({ day: null, mealType: null });
  };

  return (
    <div className="plan-container">
      <div className="meal-plan-header-container">
        <div className="meal-plan-header-actions">
          <Link className="home-link" to="/">
            <button className="home-button">Home</button>
          </Link>
        </div>
      </div>
      <div className="plan-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            {mealTypes.map((mealType) => (
              <div
                key={mealType}
                className={`meal-box ${mealType.toLowerCase()}`}
                onClick={() => handleMealClick(day, mealType)}
              >
                <div className="meal-type-name">
                  {mealPlan[day][mealType] || mealType}
                </div>
                {mealPlan[day][mealType] && (
                  <div className="meal-day-buttons">
                    <button onClick={(event) => {
                      event.stopPropagation();
                      handleClearMeal(day, mealType);
                    }}>
                        Clear
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {editing.day && editing.mealType && (
        <div className="meal-selector">
          <h3>Select a meal for {editing.mealType} on {editing.day}</h3>
          <div className="meal-plan-buttons">
            {(transformedMeals[editing.mealType] || []).map((meal) => (
              <button key={meal} onClick={() => handleSaveMeal(meal)}>
                {meal}
              </button>
            ))}
          </div>
          <div className="meal-plan-navigation">
            <button onClick={handleCloseModal}>
                Back
            </button>
          </div>

        </div>
      )}
    </div>

  );
};

export default PilotPlan;