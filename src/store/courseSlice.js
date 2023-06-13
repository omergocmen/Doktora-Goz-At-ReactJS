import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Messages } from "../constants/messages";
import baseAxios from "../helpers/baseAxios";

export const getAllCourses = createAsyncThunk("catalog/courses/getall", async () => {
  return baseAxios
    .get("catalog/courses/getall")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
    });
});


export const getById = createAsyncThunk("catalog/courses/getbyid", async (id) => {
  return baseAxios
    .get("catalog/courses/getbyid?id="+id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
    });
});

export const addCourse = createAsyncThunk("catalog/courses/save", async (data) => {
  return baseAxios
    .post("catalog/courses/save",data)
    .then((response) => {
      toast.success(Messages.addsuccess);
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
    });
});


const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    course: {}
  },
  extraReducers: {
    [getAllCourses.fulfilled]: (state, action) => {
      if (action.payload) {
        state.courses = action.payload.data;
      }
    },
    [getById.fulfilled]: (state, action) => {
      if (action.payload) {
        state.course = action.payload.data;
      }
    },
  },
});

export default courseSlice.reducer;
