import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    city: String,
    address: String,
    postal: Number,
    password: String,
    token: String,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateNickname: (state, action) => {
      state.value.nickname = action.payload;
    },
    addParking: (state, action) => {
      state.value.parking.push(action.payload);
    },
    removeParking: (state, action) => {
      state.value.parking = state.value.parking.filter(
        (e) => e.name !== action.payload
      );
    },
    importParking: (state, action) => {
      state.value.parking = action.payload;
    },
  },
});

export const { updateNickname, addParking, removeParking, importParking } =
  userSlice.actions;
export default userSlice.reducer;
