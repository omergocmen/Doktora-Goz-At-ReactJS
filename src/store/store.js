import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from './authSlice'
import course from './courseSlice'
import category from './categorySlice'
import basket from './basketSlice'
import order from './orderSlice'
import discount from './discountSlice'
import doctor from "./doctorSlice"


const combinedReducers = combineReducers({
    auth,
    course,
    category,
    basket,
    order,
    discount,
    doctor
});

const store = configureStore({
    reducer: combinedReducers
});

export default store;
