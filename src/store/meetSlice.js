import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseAxios from "../helpers/baseAxios";

export const getAllMeeting = createAsyncThunk("meeting/all", async () => {
    return baseAxios
        .get("meeting/all")
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

export const getMeetingById = createAsyncThunk("meeting/getmeetingbyid", async (id) => {
    return baseAxios
        .get("meeting/"+id)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
    });


export const complateMeet = createAsyncThunk("meeting/getmeetingbyid/complate", async (id, data) => {
    return baseAxios
        .post("meeting/"+id+"/complate",data)
        .then((response) => {
            toast.success("Teşhis raporu eklendi.");
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

const meetSlice = createSlice({
    name: "meet",
    initialState: {
        meets: [],
        meet: {}
    },
    extraReducers: {
        [getAllMeeting.fulfilled]: (state, action) => {
            if (action.payload) {
                state.meets = action.payload.data;
            }
        },
        [getMeetingById.fulfilled]: (state, action) => {
            if (action.payload) {
                state.meet = action.payload.data;
            }
        },
    },
});

export default meetSlice.reducer;
