import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 4,
  data: "zain",
};

const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const CounterReducer = CounterSlice.reducer;
