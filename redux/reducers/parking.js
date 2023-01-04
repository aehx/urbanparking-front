import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { parkingList: [] },
};

export const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    addParking: (state, action) => {
      state.value.parkingList = action.payload;
    },
  },
});

export const { addParking } = parkingSlice.actions;
export default parkingSlice.reducer;
