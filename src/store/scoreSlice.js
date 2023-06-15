import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import baseAxios from "../helpers/baseAxios";
import {toast} from "react-toastify";

export const sendPoint = createAsyncThunk("scoring/getdoctorbyid/send", async ({id, data}) => {
    return baseAxios
        .post("scoring/"+id+"/send",data)
        .then((response) => {
            toast.success("Doktor Değerlendirildi.");
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

const scoreSlice = createSlice({
    name: "score",
    initialState: {

    },
    extraReducers: {

    },
});

export default scoreSlice.reducer;