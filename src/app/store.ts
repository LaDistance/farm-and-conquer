import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tickCounterReducer from "../features/tickCounter/tickCounterSlice";
import moneyReducer from "../features/money/moneySlice";
import parcelsReducer from "../features/parcels/parcelsSlice";
import ownedParcelsReducer from "../features/ownedParcels/ownedParcelsSlice";
export const store = configureStore({
  reducer: {
    tickCounter: tickCounterReducer,
    money: moneyReducer,
    parcels: parcelsReducer,
    ownedParcels: ownedParcelsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
