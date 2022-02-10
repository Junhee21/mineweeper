import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateArr, incrementMines, decrementMines, 
  incrementAnswers, decrementAnswers, Square } from "./gameSlice";
import { RootState } from "./store";
import './app.scss'

export default function Game() {
  const mines = useSelector((state: RootState) => state.game.mines)
  const arr = useSelector((state: RootState) => state.game.arr)
  const rows = useSelector((state: RootState) => state.game.rows)
  const columns = useSelector((state: RootState) => state.game.columns)
  const dispatch = useDispatch();
  const totalSquare: number = columns * rows;
  const dir: Array<Array<number>> = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1]
  ];

  useEffect(() => {
    // 랜덤 지뢰 정하기
    const temp: Array<number> = [];
    for (let i: number = 0; i < mines; i++) {
      let num: number = Math.floor(Math.random() * totalSquare);
      if (temp.indexOf(num) === -1) {
        temp.push(num);
      } else {
        i--;
      }
    }

    // 지뢰 표시
    const cp: Array<Array<Square>> = JSON.parse(JSON.stringify(arr));
    temp.map((num: number) => {
      let r: number = Math.floor(num / columns);
      let c: number = num % columns;
      cp[r][c].mine = -1;
    })

    // 주위에 지뢰 몇갠지 표시
    cp.map((row: Array<object>, rowIndex: number) => {
      row.map((obj: object, columnIndex: number) => {
        if (cp[rowIndex][columnIndex].mine !== -1) {
          for (let i = 0; i < 8; i++) {
            let r: number = rowIndex + dir[i][0];
            let c: number = columnIndex + dir[i][1];
            if ((r >= 0) && (r < rows) && (c >= 0) && (c < columns) && (cp[r][c].mine === -1)) {
              cp[rowIndex][columnIndex].mine++;
            }
          }
        }
      })
    })

    dispatch(updateArr(cp));
  }, [])

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>, r: number, c: number) => {
    e.preventDefault();
    const cp: Array<Array<Square>> = JSON.parse(JSON.stringify(arr));
    if (!cp[r][c].checkMine) {
      dispatch(decrementMines());
      cp[r]
      [c].checkMine = true;
      if (cp[r][c].mine === -1) {
        dispatch(decrementAnswers());  
      }
    } else {
      dispatch(incrementMines());
      cp[r][c].checkMine = false;
      if (cp[r][c].mine === -1) {
        dispatch(incrementAnswers());
      }
    }
    dispatch(updateArr(cp));
  }

  const handleClick = (r: number, c: number) => {
    const cp: Array<Array<Square>> = JSON.parse(JSON.stringify(arr));
    if (!cp[r][c].explore) {
      if (cp[r][c].mine === -1) {
        alert("실패");
      } else if (cp[r][c].mine === 0) {
        explore(cp, r, c);
      } else {
        cp[r][c].explore = true;
        dispatch(decrementAnswers());
      }
    }
    dispatch(updateArr(cp));
  }

  const explore = (cp: Array<Array<Square>>, r: number, c: number) => {
    cp[r][c].explore = true;
    dispatch(decrementAnswers());
    for (let i = 0; i < 8; i++) {
      let r1: number = r + dir[i][0];
      let c1: number = c + dir[i][1];
      console.log(dir[i][0]);
      if ((r1 >= 0) && (r1 < rows) && (c1 >= 0) && (c1 < columns) && (!cp[r1][c1].explore)) {
        if (cp[r1][c1].mine === 0) {
          explore(cp, r1, c1);
        } else if (cp[r1][c1].mine > 0) {
          cp[r1][c1].explore = true;
          dispatch(decrementAnswers());
        }
      }
    }
  }

  return (
    <div>
      <div className="grid">
        {arr.map((row, indexRow) => {
          return (
            row.map((col, indexCol) => {
              if (arr[indexRow][indexCol].explore) {
                return (<div className="red" >{arr[indexRow][indexCol].mine}</div>)
              } else if (!arr[indexRow][indexCol].explore) {
                return (
                  <div
                    key={indexRow * 1000 + indexCol}
                    className="item"
                    onClick={() => handleClick(indexRow, indexCol)}
                    onContextMenu={(e) => handleRightClick(e, indexRow, indexCol)}
                  >
                    {arr[indexRow][indexCol].mine}
                  </div>
                )
              } if (arr[indexRow][indexCol].checkMine) {
                return (<div className="green" >{arr[indexRow][indexCol].mine}</div>)
              }
            })
          )
        })}
      </div>
      <button onClick={() => console.log(arr)}>
        sd
      </button>
    </div>
  )
}