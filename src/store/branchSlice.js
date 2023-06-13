import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseAxios from "../helpers/baseAxios";

export const getAllBranch = createAsyncThunk("information/all-branch", async () => {
  return baseAxios
    .get("information/all-branch")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
    });
});


const branchSlice = createSlice({
  name: "branch",
  initialState: {
    branch: [],
  },
  extraReducers: {
    [getAllBranch.fulfilled]: (state, action) => {
      if (action.payload) {
        state.branch = action.payload.data;
      }
    }
  },
});

export default branchSlice.reducer;
