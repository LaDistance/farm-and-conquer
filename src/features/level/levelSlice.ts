import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface LevelState {
  value: number;
}

const initialState: LevelState = {
  value: 0,
};

export const levelSlice = createSlice({
  name: "money",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateLevel: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { updateLevel } = levelSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLevel = (state: RootState) => state.level.value;

export default levelSlice.reducer;
