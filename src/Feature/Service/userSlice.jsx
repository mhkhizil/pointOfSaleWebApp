import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  name: null,
  email: null,
  role: null,
  password: null,
  password_confirmation: null,
  phone: null,
  date_of_birth: null,
  gender: null,
  address: null,
  user_photo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addName: (state, { payload }) => {
      state.name = payload.name;
    },
    addPhone: (state, { payload }) => {
      state.phone = payload.phone;
    },
    addRole: (state, {payload}) => {
      state.role = payload.role
    },
    addBirthDate: (state, { payload }) => {
      state.date_of_birth = payload.date_of_birth;
    },
    addAddress: (state, { payload }) => {
      state.address = payload.address;
    },
    addGender: (state, { payload }) => {
      state.gender = payload.gender;
    },
    addEmail: (state, { payload }) => {
      state.email = payload.email;
    },
    addPassword: (state, { payload }) => {
      state.password = payload.password;
    },
    addConfirmPass: (state, { payload }) => {
      state.password_confirmation = payload.password_confirmation;
    },
    addPhoto: (state, {payload}) => {
        state.user_photo = payload.user_photo
    },
  },
});

export const {
  addAddress,
  addBirthDate,
  addName,
  addPhone,
  addRole,
  addConfirmPass,
  addGender,
  addEmail,
  addPassword,
  addPhoto,
} = userSlice.actions;
export default userSlice.reducer;
