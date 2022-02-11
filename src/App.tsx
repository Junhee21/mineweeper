import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Game from './app/game';
import Topbar from './app/topbar';
import SetDifficulty from './app/setDifficulty';
import './App.scss';

export default function App() {
  const boolSetDifficulty = useSelector((state: RootState) => state.game.boolSetDifficulty)
  return (
    <div className="App">
      <Topbar />
      <Game />
      {boolSetDifficulty && <SetDifficulty />}
    </div>
  );
}