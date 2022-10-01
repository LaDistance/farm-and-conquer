import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface MoneyState {
  value: number;
}

const initialState: MoneyState = {
  value: 1000,
};

export const moneySlice = createSlice({
  name: "money",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    incrementMoney: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    decrementMoney: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

export const { incrementMoney, decrementMoney } = moneySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMoney = (state: RootState) => state.money.value;

export default moneySlice.reducer;
