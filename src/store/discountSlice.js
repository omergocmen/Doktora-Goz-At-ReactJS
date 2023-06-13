import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Messages } from "../constants/messages";
import privateBaseAxios from "../helpers/privateBaseAxios";

export const getDiscountByCode = createAsyncThunk("discount/getbycode", async (code) => {
  return privateBaseAxios
    .get("discount/getbycode?code="+code)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
});

export const saveDiscount = createAsyncThunk("discount/save", async (data) => {
    return privateBaseAxios
      .post("discount/save",data)
      .then((response) => {
        toast.success(Messages.couponaddsuccess)
        return response.data;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  });

  export const deleteDiscount = createAsyncThunk("discount/delete", async (id) => {
    return privateBaseAxios
      .get("discount/delete?id="+id)
      .then((response) => {
        toast.success(Messages.couponremovedsuccess)
        return response.data;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  });
  
const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discount: {},
  },
  extraReducers: {
    [getDiscountByCode.fulfilled]: (state, action) => {
      if (action.payload) {
        state.discount = action.payload.data;
      }
    },
  },
});

export default discountSlice.reducer;
