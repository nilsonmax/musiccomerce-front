import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import reducer from '../reducer/instrumentsReducers.js'
import thunk from 'redux-thunk'

// let store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(thunk)))

// export default store;


// import { createStore, applyMiddleware, compose } from "redux";

import rootReducers from "../reducer";

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const initState = { cart: { items: cartItems } };
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    rootReducers,
    initState,
    composeWithDevTools(applyMiddleware(thunk))
    // composeEnhancer(applyMiddleware(thunk))
);
export default store;