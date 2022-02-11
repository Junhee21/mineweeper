import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { toggleSetDifficulty } from "./gameSlice";
import '../App.scss'

export default function Topbar() {
  const dispatch = useDispatch();
  const mines = useSelector((state: RootState) => state.game.mines)
  const answers = useSelector((state: RootState) => state.game.answers)
  return (
    <div className="topbar">
      <div
        onClick={() => dispatch(toggleSetDifficulty())}
      >
        난이도
      </div>
      <div>
        {answers}
      </div>
      <div>
        {mines}
      </div>
    </div>
  )
}