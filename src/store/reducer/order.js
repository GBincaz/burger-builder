import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../utility/utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state) => {
    return updateObject(state, {
        purchased: false
    });
};
const purchaseBurgerStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};
const purchaseBurgerFailed = (state) => {
    return updateObject(state, {
        loading: false
    });
};
const fetchOrderStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};
const fetchOrderFailed = (state) => {
    return updateObject(state, {
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state);
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrderFailed(state);
        default: return state;
    }
};

export default reducer;