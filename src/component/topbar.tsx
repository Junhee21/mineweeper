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

  const [timer, setTimer] = useState<number>(0); // clearInterval을 위해
  const [cnt, setCnt] = useState<number>(0); // 1초마다 +1

  useEffect(() => {
    /**
     * result가 바뀌지 않아도 timer가 재시작되어야 할 때를 위해
     *  ex) 새 게임 버튼을 누를 때
     */
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
        // 현재 게임 정보(지뢰 개수, 판 크기)로 새 게임을 시작
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