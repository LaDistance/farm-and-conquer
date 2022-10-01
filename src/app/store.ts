import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tickCounterReducer from "../features/tickCounter/tickCounterSlice";
import moneyReducer from "../features/money/moneySlice";
import parcelsReducer from "../features/parcels/parcelsSlice";
import ownedParcelsReducer from "../features/ownedParcels/ownedParcelsSlice";
import secondsReducer from "../features/seconds/secondsSlice";
export const store = configureStore({
  reducer: {
    seconds: secondsReducer,
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
