import * as  actionType from '../actions/actionTypes'
import {updateObject} from "../../utility/utility";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const getUpdatedStateForAddOrRemoveIngredient = (state, action) => {
    let newIngredientCount;
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            newIngredientCount = state.ingredients[action.ingredientName] + 1;
            break;
        case actionType.REMOVE_INGREDIENT:
            newIngredientCount = state.ingredients[action.ingredientName] - 1;
            break;
    }
    const updatedIngredient = {[action.ingredientName]: newIngredientCount};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
}

const addOrRemoveIngredient = (state, action) => {
    return updateObject(state, getUpdatedStateForAddOrRemoveIngredient(state, action));
}
const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
}
const fetchIngredientFailed = (state) => {
    return updateObject(state, {
        error: true
    });
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addOrRemoveIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: return addOrRemoveIngredient(state, action);
        case actionType.SET_INGREDIENTS: return setIngredient(state, action);
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed(state);
        default: return state;
    }
}

export default burgerBuilder;