import { useState, useCallback } from 'react';

export const useGroceryList = () => {
    const [groceryList, setGroceryList] = useState([]);

    const loadGroceryList = useCallback(() => {
        const storedList = JSON.parse(localStorage.getItem('groceryList')) || [];
        const formattedGroceryList = storedList.map(item => ({
            name: item.name || item,
            checked: item.checked || false
        }));
        setGroceryList(formattedGroceryList);
    }, []);

    const addIngredientsToGroceryList = (selectedIngredients) => {
        const newIngredients = selectedIngredients.filter(ingredient =>
            !groceryList.some(item => item.name === ingredient)
        ).map(ingredient => ({ name: ingredient, checked: false }));

        const updatedGroceryList = [...groceryList, ...newIngredients];
        setGroceryList(updatedGroceryList);
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));
    };

    const handleIngredientChange = (ingredientName) => {
        const updatedGroceryList = groceryList.map(item =>
            item.name === ingredientName
                ? { ...item, checked: !item.checked }
                : item
        );
        setGroceryList(updatedGroceryList);
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));
    };

    const deleteIngredient = (ingredientName) => {
        const updatedGroceryList = groceryList.filter(item => item.name !== ingredientName);
        setGroceryList(updatedGroceryList);
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));
    };

    const saveGroceryList = () => {
        const updatedGroceryList = groceryList.map(item => ({ name: item.name, checked: item.checked }));
        localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));
    };

    return { groceryList, loadGroceryList, addIngredientsToGroceryList, handleIngredientChange, deleteIngredient, saveGroceryList };
};
