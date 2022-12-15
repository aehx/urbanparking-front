import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { parkingList: [] },
};

export const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    addParking: (state, action) => {
      state.value.parkingList.push(action.payload);
    },
    removeParking: (state) => {
      state.value.parkingList = [];
    },
  },
});

export const { addParking, removeParking } = parkingSlice.actions;
export default parkingSlice.reducer;
