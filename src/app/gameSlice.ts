import { createSlice } from '@reduxjs/toolkit';

export interface Game {
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
	},
});

export const {
	updateArr, decrementMines, incrementMines, decrementAnswers, incrementAnswers
} = gameSlice.actions;
export default gameSlice.reducer;