import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export const rootReducer = combineReducers({
  game: gameReducer
});

export type RootState = ReturnType<typeof rootReducer>