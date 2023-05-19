import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseAxios from "../helpers/baseAxios";

export const getAllDoctors = createAsyncThunk("information/all-doctor", async () => {
  return baseAxios
    .get("information/all-doctor")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
    });
});


export const getDoctorById = createAsyncThunk("information/getdoctorbyid", async (id) => {
  return baseAxios
    .get("information/doctor/"+id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
    });
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    doctor: {}
  },
  extraReducers: {
    [getAllDoctors.fulfilled]: (state, action) => {
      if (action.payload) {
        state.doctors = action.payload.data;
      }
    },
    [getDoctorById.fulfilled]: (state, action) => {
      if (action.payload) {
        state.doctor = action.payload.data;
      }
    },
  },
});

export default doctorSlice.reducer;
