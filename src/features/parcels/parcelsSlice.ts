import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Parcel } from "../../types/Parcel";

const initialState: Parcel[] = [
  {
    id: 1,
    x: 0,
    y: 0,
    farmBuildings: [
      {
        building: {
          id: 1,
          name: "Farm",
          moneyPerTick: 50,
        },
        count: 5,
      },
    ],
    soldiers: 0,
  },
];

export const parcelsSlice = createSlice({
  name: "parcels",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addParcel: (state, action: PayloadAction<Parcel>) => {
      state.push(action.payload);
    },
    removeParcel: (state, action: PayloadAction<number>) => {
      state = state.filter((parcel) => parcel.id !== action.payload);
    },
    // Updates
    setParcel: (state, action: PayloadAction<Parcel>) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.id
      );
      state[parcelIndex] = action.payload;
    },

    setParcelFarmBuildings: (state, action: PayloadAction<Parcel>) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.id
      );
      state[parcelIndex].farmBuildings = action.payload.farmBuildings;
    },

    setParcelSoldiers: (state, action: PayloadAction<Parcel>) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.id
      );
      state[parcelIndex].soldiers = action.payload.soldiers;
    },
  },
});

export const {
  addParcel,
  removeParcel,
  setParcel,
  setParcelFarmBuildings,
  setParcelSoldiers,
} = parcelsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectParcels = (state: RootState) => state.parcels;

export default parcelsSlice.reducer;
