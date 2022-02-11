import { createSlice } from '@reduxjs/toolkit';

export interface Game {
  result: number;
  boolNewGame: boolean;
  boolSetDifficulty: boolean;
  startMines: number;
  nowMines: number;
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
  result: 0,
  boolNewGame: false,
  boolSetDifficulty: false,
  startMines: 99,
  nowMines: 99,
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
      state.nowMines -= 1;
    },
    incrementMines: (state) => {
      state.nowMines += 1;
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
      state.result = 0;
      state.boolNewGame = !state.boolNewGame;
      state.startMines = action.payload.startMines;
      state.nowMines = action.payload.startMines;
      state.answers = action.payload.answers;
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
      state.arr = action.payload.arr;
    },
    switchResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const {
  updateArr, decrementMines, incrementMines, decrementAnswers,
  incrementAnswers, toggleSetDifficulty, newGame, switchResult
} = gameSlice.actions;
export default gameSlice.reducer;