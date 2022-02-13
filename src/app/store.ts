import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

// useSelector에서 state의 type설정을 위해
export const rootReducer = combineReducers({
  game: gameReducer
});
export type RootState = ReturnType<typeof rootReducer>