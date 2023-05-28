import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseAxios from "../helpers/baseAxios";

export const getDoctorAppointmentDates = createAsyncThunk("appointment/datesbydoctorid", async (id) => {
    return baseAxios
        .get("appointment/dates?doctorId=" + id)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

export const getAllAppointment = createAsyncThunk("appointment/all", async () => {
    return baseAxios
        .get("appointment/all")
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

export const createAppointment = createAsyncThunk("appointment/create", async (data) => {
    return baseAxios
        .post("appointment/create",data)
        .then((response) => {
            toast.success("Başarıyla Oluşturuldu.");
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

export const rejectAppointment = createAsyncThunk("appointment/appointmentid/reject", async (id ,data) => {
    return baseAxios
        .post("appointment/" + id + "/reject",data)
        .then((response) => {
            toast.success("Randevu Reddedildi.");
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

export const cancelAppointment = createAsyncThunk("appointment/appointmentid/cancel", async (id) => {
    return baseAxios
        .post("appointment/" + id + "/cancel")
        .then((response) => {
            toast.success("Randevu İptal Edildi.");
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});

export const approveAppointment = createAsyncThunk("appointment/appointmentid/approve", async (id) => {
    return baseAxios
        .post("appointment/" + id + "/approve")
        .then((response) => {
            toast.success("Randevu İptal Edildi.");
            return response.data;
        })
        .catch((err) => {
            toast.error(err.message);
        });
});



const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        appointments: [] ,
        doctorAppointmentDates: []

    },
    extraReducers: {
        [getAllAppointment.fulfilled]: (state, action) => {
            if (action.payload) {
                state.appointments = action.payload.data;
            }
        },
        [getDoctorAppointmentDates.fulfilled]: (state, action) => {
            if (action.payload) {
                state.doctorAppointmentDates = action.payload.data;
            }
        },
    },
});

export default appointmentSlice.reducer;