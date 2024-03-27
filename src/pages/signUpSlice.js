import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  userName: "",
  signUpSuccess: false,
  avatar: "",
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState: initialValue,
  reducers: {
    updateAva: (state, action) => {
      state.avatar = action.payload;
    },
    updateName: (state, action) => {
      state.userName = action.payload;
    },

    signUpSuccess: (state, action) => {
      state.signUpSuccess = action.payload;
    },
    logOut: (state) => {
      state.userName = "";
      state.signUpSuccess = false;
      state.avatar = "";
    },
  },
});

export const { updateAva, updateName, signUpSuccess, logOut } =
  signUpSlice.actions;

export default signUpSlice.reducer;
