import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Parcel } from "../../types/Parcel";
import { OwnedFarmBuilding } from "../../types/OwnedFarmBuilding";
import { OwnedWarBuilding } from "../../types/OwnedWarBuilding";

const initialState: Parcel[] = [];

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

    setParcels: (state, action: PayloadAction<Parcel[]>) => {
      return action.payload;
    },

    setParcelOwner: (
      state,
      action: PayloadAction<{ id: number; owner: number }>
    ) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.id
      );
      if (parcelIndex !== -1) {
        state[parcelIndex].owner = action.payload.owner;
      } else {
        console.log("[setParcelOwner] Parcel not found : ", action.payload.id);
      }
    },

    // Updates
    setParcel: (state, action: PayloadAction<Parcel>) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.id
      );
      state[parcelIndex] = action.payload;
    },

    setParcelFarmBuildings: (
      state,
      action: PayloadAction<{ id: number; farmBuildings: OwnedFarmBuilding[] }>
    ) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.id
      );
      state[parcelIndex].farmBuildings = action.payload.farmBuildings;
    },

    setParcelWarBuildings: (
      state,
      action: PayloadAction<{ id: number; warBuildings: OwnedWarBuilding[] }>
    ) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.id
      );
      state[parcelIndex].warBuildings = action.payload.warBuildings;
    },

    setBuildingCount: (
      state,
      action: PayloadAction<{
        parcelId: number;
        buildingId: number;
        count: number;
      }>
    ) => {
      const parcelIndex = state.findIndex(
        (parcel) => parcel.id === action.payload.parcelId
      );
      const buildingIndex = state[parcelIndex].farmBuildings.findIndex(
        (farmBuilding) => farmBuilding.building.id === action.payload.buildingId
      );
      state[parcelIndex].farmBuildings[buildingIndex].count =
        action.payload.count;
    },

    setParcelSoldiers: (
      state,
      action: PayloadAction<{ id: number; soldiers: number }>
    ) => {
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
  setParcels,
  setParcel,
  setParcelFarmBuildings,
  setParcelSoldiers,
  setBuildingCount,
  setParcelWarBuildings,
} = parcelsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectParcels = (state: RootState) => state.parcels;

export const selectParcelFarmBuildings = (state: RootState, id: number) => {
  const parcel = state.parcels.find((parcel) => parcel.id === id);
  return parcel!.farmBuildings;
};

export default parcelsSlice.reducer;
