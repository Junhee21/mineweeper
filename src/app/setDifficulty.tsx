import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSetDifficulty, newGame } from "./gameSlice";
import '../App.scss'

export default function SetDifficulty() {
  const dispatch = useDispatch();
  const [difficulty, setDifficulty] = useState("")
  const [rows, setRows] = useState("20")
  const [columns, setColumns] = useState("30")
  const [startMines, setMines] = useState("145")

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleNewGame = () => {
    if (difficulty) {
      if (difficulty === "쉬움") {
        dispatch(newGame({
          startMines: 10,
          answers: 81,
          rows: 9,
          columns: 9,
          arr: Array(9).fill(Array(9).fill({
            explore: false,
            checkMine: false,
            mine: 0
          }))
        }));
      } else if (difficulty === "보통") {
        dispatch(newGame({
          startMines: 40,
          answers: 256,
          rows: 16,
          columns: 16,
          arr: Array(16).fill(Array(16).fill({
            explore: false,
            checkMine: false,
            mine: 0
          }))
        }));
      } else if (difficulty === "어려움") {
        dispatch(newGame({
          startMines: 99,
          answers: 480,
          rows: 16,
          columns: 30,
          arr: Array(16).fill(Array(30).fill({
            explore: false,
            checkMine: false,
            mine: 0
          }))
        }));
      } else {
        dispatch(newGame({
          startMines: Number(startMines),
          answers: Number(rows) * Number(columns),
          rows: Number(rows),
          columns: Number(columns),
          arr: Array(Number(rows)).fill(Array(Number(columns)).fill({
            explore: false,
            checkMine: false,
            mine: 0
          }))
        }));
      }
      dispatch(toggleSetDifficulty())
    }
  }

  return (
    <div
      className="setDifficulty"
      onContextMenu={(e) => handleRightClick(e)}
    >
      <div className="top">
        <div
          className="X"
          onClick={() => dispatch(toggleSetDifficulty())}
        >
          X
        </div>
      </div>
      <div className="item">
        <input
          type="radio"
          name="radio"
          onChange={(() => setDifficulty("쉬움"))}
        />
        <div>
          쉬움
        </div>
      </div>
      <div className="item">
        <input
          type="radio"
          name="radio"
          onChange={(() => setDifficulty("보통"))}
        />
        <div>
          보통
        </div>
      </div>
      <div className="item">
        <input
          type="radio"
          name="radio"
          onChange={(() => setDifficulty("어려움"))}
        />
        <div>
          어려움
        </div>
      </div>
      <div className="item">
        <input
          type="radio"
          name="radio"
          onChange={(() => setDifficulty("사용자 설정"))}
        />
        <div>
          사용자 설정
        </div>
      </div>
      <div className="item">
        <textarea
          className='textarea'
          placeholder="세로"
          onChange={(e) => setRows(e.target.value)}
        />
        <textarea
          className='textarea'
          placeholder="가로"
          onChange={(e) => setColumns(e.target.value)}
        />
        <textarea
          className='textarea'
          placeholder="지뢰"
          onChange={(e) => setMines(e.target.value)}
        />
      </div>
      <div
        className="buttonNewGame"
        onClick={() => handleNewGame()}
      >
        새 게임
      </div>
    </div>
  )
}