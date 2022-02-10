import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

export default function Topbar() {
  const mines = useSelector((state: RootState) => state.game.mines)
  const answers = useSelector((state: RootState) => state.game.answers)
    return (
        <div>
            남은 정답 :{answers} ------ 지뢰: {mines}
        </div>
    )
}