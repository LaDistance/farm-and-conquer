import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: number[] = [];

export const ownedParcelsSlice = createSlice({
  name: "ownedParcels",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    grantParcel: (state, action: PayloadAction<number>) => {
      state.push(action.payload);
    },
    ungrantParcel: (state, action: PayloadAction<number>) => {
      state = state.filter((id) => id !== action.payload);
    },
    setOwnedParcels: (state, action: PayloadAction<number[]>) => {
      return action.payload;
    },
  },
});

export const { grantParcel, ungrantParcel, setOwnedParcels } =
  ownedParcelsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOwnedParcels = (state: RootState) => state.ownedParcels;

export default ownedParcelsSlice.reducer;
