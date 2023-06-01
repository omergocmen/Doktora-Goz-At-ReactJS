import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Messages } from "../constants/messages";
import baseAxios from "../helpers/baseAxios";


export const login = (data) => {
    return axios.post("http://localhost:3000/api/authentication/login",data)
};


export const registerDoctor = createAsyncThunk("authentication/register/doctor", async (data) => {
    return baseAxios.post("authentication/register/doctor", data).then((response) => {
        toast.success(Messages.creationsuccess)
        return response.data.data;
    }).catch(err=>{
        toast.error(err.message)
    });
});



const authSlice = createSlice({
    name: "auth",
    initialState: {
    },
    extraReducers: {
        // [login.fulfilled]: (state, action) => {
        //     if(action.payload){state.userIn = action.payload.tokenUser;}
        // }
    },
});

export default authSlice.reducer;
