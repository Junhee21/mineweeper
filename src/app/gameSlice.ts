import { createSlice } from '@reduxjs/toolkit';

export interface Game {
  boolNewGame: boolean;
  boolSetDifficulty: boolean;
  mines: number;
  answers: number;
  rows: number;
  columns: number;
  arr: Array<Array<Square>>;
}

export interface Square {
  explore: boolean;
  checkMine: boolean;
  mine: number;  // -1: mine, 0이상: around mine num
}

const initialState: Game = {
  boolNewGame: false,
  boolSetDifficulty: false,
  mines: 99,
  answers: 480,
  rows: 16,
  columns: 30,
  arr: Array(16).fill(Array(30).fill({
    explore: false,
    checkMine: false,
    mine: 0
  }))
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateArr: (state, action) => {
      state.arr = action.payload;
    },
    decrementMines: (state) => {
      state.mines -= 1;
    },
    incrementMines: (state) => {
      state.mines += 1;
    },
    decrementAnswers: (state) => {
      state.answers -= 1;
    },
    incrementAnswers: (state) => {
      state.answers += 1;
    },
    toggleSetDifficulty: (state) => {
      state.boolSetDifficulty = !state.boolSetDifficulty;
    },
    newGame: (state, action) => {
      state.boolNewGame = !state.boolNewGame;
      state.mines = action.payload.mines;
      state.answers = action.payload.answers;
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
      state.arr = action.payload.arr;
    }
  },
});

export const {
  updateArr, decrementMines, incrementMines, decrementAnswers,
  incrementAnswers, toggleSetDifficulty, newGame
} = gameSlice.actions;
export default gameSlice.reducer;