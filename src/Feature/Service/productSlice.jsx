import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  name: null,
  brand_id: null,
  actual_price: null,
  sale_price: null,
  unit: null,
  more_information: null,
  photo: null,

};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductName: (state, { payload }) => {
      state.name = payload.name;
    },
    addProductBrand_id: (state, { payload }) => {
      state.brand_id = payload.brand_id;
    },
    addProductActual_price: (state, {payload}) => {
      state.actual_price = payload.actual_price
    },
    addProductSale_price: (state, { payload }) => {
      state. sale_price = payload. sale_price;
    },
    addProductUnit: (state, { payload }) => {
      state.unit = payload.unit;
    },
    addProductMore_information: (state, { payload }) => {
      state.more_information = payload.more_information;
    },
    addProductPhoto: (state, { payload }) => {
      state.photo = payload.photo;
    },
   
    
    
  },
});

export const {
    addProductName,
    addProductBrand_id,
    addProductActual_price,
    addProductSale_price,
    addProductUnit,
    addProductMore_information,
    addProductPhoto
} = productSlice.actions;
export default productSlice.reducer;
