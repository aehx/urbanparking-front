import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, favorisPark: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
    },
    favorisPark: (state, action) => {
      const isFav = state.value.favorisPark.includes(action.payload);

      if (isFav) {
        state.value.favorisPark = state.value.favorisPark.filter(
          (e) => e !== action.payload
        );
      } else {
        state.value.favorisPark.push(action.payload);
      }
    },
  },
});

export const { login, logout, favorisPark } = userSlice.actions;
export default userSlice.reducer;
