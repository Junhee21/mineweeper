import { createSlice } from '@reduxjs/toolkit';

export interface Game {
  /**
   * result
   *  = 0: 게임 진행중
   *  = 1: 성공(모든 칸 파악 완료)
   *  = -1: 실패(지뢰 좌클릭)
   */
  result: number;

  /**
   * toggle 되면 새 게임
   * game.tsx에서 새 게임을 만드는 useEffect의 deps
   */
  boolNewGame: boolean;

  /**
   * 난이도 설정 창(<SetDifficulty>) 렌더링을 위한 변수
   * true: 렌더링
   */
  boolSetDifficulty: boolean;

  /**
   * 게임 시작 시 지뢰 개수
   * 게임을 재시작할 때, 지뢰갯수를 불러오기 위한 변수
   */
  startMines: number;

  /**
   * 게임 진행 중 남은 지뢰 개수, topbar에 렌더링
   * 칸 우클릭 시 -1
   */
  nowMines: number;

  /**
   * 칸을 맞게 체크하면 -1 (지뢰 우클릭, 아닌 곳 좌클릭)
   * 지뢰가 아닌 곳을 우클릭하면 -1 되지 않음
   * 처음 시작: 전체 칸 개수, 0이 되면 게임 성공
   */
  answers: number;

  /**
   * 줄 개수
   */
  rows: number;

  /**
   * 열 개수
   */
  columns: number;

  /**
   * 칸의 정보를 이차원 배열에 저장
   */
  arr: Array<Array<Square>>;
}

export interface Square {
  /**
   * 좌클릭시 true로 toggle
   * true인 경우 좌클릭, 우클릭 불가
   */
  explore: boolean;

  /**
   * 우클릭시 true로 toggle
   * 값 상관없이 좌클릭 가능
   */
  checkMine: boolean;

  /**
   * mine
   *  = -1: 지뢰
   *  >= 0: 주위 8칸의 지뢰 개수
   */
  mine: number;
}

const initialState: Game = {
  // 처음 시작시 난이도 어려움으로 설정
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