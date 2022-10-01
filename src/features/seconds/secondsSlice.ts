import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type SecondsState = {
  value: number;
};
const initialState: SecondsState = {
  value: 10,
};

export const secondsSlice = createSlice({
  name: "seconds",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateSeconds: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSeconds } = secondsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSeconds = (state: RootState) => state.seconds.value;

export default secondsSlice.reducer;
