import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { toggleSetDifficulty, newGame } from "../app/gameSlice";
import classnames from 'classnames';
import '../App.scss'

export default function Topbar() {
  const dispatch = useDispatch();
  const result = useSelector((state: RootState) => state.game.result)
  const boolNewGame = useSelector((state: RootState) => state.game.boolNewGame)
  const startMines = useSelector((state: RootState) => state.game.startMines)
  const nowMines = useSelector((state: RootState) => state.game.nowMines)
  const rows = useSelector((state: RootState) => state.game.rows)
  const columns = useSelector((state: RootState) => state.game.columns)
  const [timer, setTimer] = useState(0);
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    clearInterval(timer);
    if (result === 0) {
      setCnt(0);
      var _timer : any = setInterval(() => setCnt(cnt => cnt+1), 1000);
      setTimer(_timer);
    }
  }, [boolNewGame])

  useEffect(() => {
    clearInterval(timer);
  }, [result])

  return (
    <div className="topbar">
      {(result === 1) && <div className="title">완료</div>}
      {(result === 0) && <div className="title">지뢰 찾기</div>}
      {(result === -1) && <div className="title">실패</div>}
      <div className={classnames("text", "boldBorderLeft")}>
        {nowMines}
      </div>
      <div className={classnames("text", "boldBorderLeft")}>
        {cnt}초
      </div>
      <div
        className={classnames("button", "boldBorderLeft")}
        onClick={() => dispatch(toggleSetDifficulty())}
      >
        난이도
      </div>
      <div
        className={classnames("button", "boldBorderLeft")}
        onClick={() => dispatch(newGame({
          startMines: startMines,
          answers: rows*columns,
          rows: rows,
          columns: columns,
          arr: Array(rows).fill(Array(columns).fill({
            explore: false,
            checkMine: false,
            mine: 0
          }))
        }))}
      >
        새 게임
      </div>
    </div>
  )
}