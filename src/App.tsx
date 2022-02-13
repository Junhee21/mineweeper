import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Game from './component/game';
import Topbar from './component/topbar';
import SetDifficulty from './component/setDifficulty';
import './App.scss';

export default function App() {
  /*
    <SetDifficulty /> 렌더링을 위한 변수
    boolSetDifficulty === true 면  <SetDiffuculty> 렌더링됨
  */
  const boolSetDifficulty = useSelector((state: RootState) => state.game.boolSetDifficulty)
  return (
    <div className='main'>
      <div className="App">
        <Topbar />
        <Game />
        {boolSetDifficulty && <SetDifficulty />}
      </div>
    </div>
  );
}