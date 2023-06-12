import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from './authSlice'
import course from './courseSlice'
import category from './categorySlice'
import basket from './basketSlice'
import order from './orderSlice'
import discount from './discountSlice'
import doctor from "./doctorSlice"
import meet from "./meetSlice"
import appointment from "./appointmentSlice"
import branch from "./branchSlice";
import score from "./scoreSlice";


const combinedReducers = combineReducers({
    auth,
    course,
    category,
    basket,
    order,
    discount,
    doctor,
    meet,
    appointment,
    branch,
    score
});

const store = configureStore({
    reducer: combinedReducers
});

export default store;
