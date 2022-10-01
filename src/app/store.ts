import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tickCounterReducer from '../features/tickCounter/tickCounterSlice';

export const store = configureStore({
  reducer: {
    tickCounter: tickCounterReducer,
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
