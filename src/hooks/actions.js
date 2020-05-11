import { MINE_NONE, MINE_ACTIVED, MINE_FLAG, MINE_DOUBT } from "../utils";

export function handleLeft(draft, action) {
  const [x, y] = action.payload.pos;
  const { mines, visited } = draft;

  visited[`${x},${y}`] = MINE_ACTIVED;

  // 如果是雷，直接结束游戏
  if (mines[x][y] === 9) {
    draft.gameOver = true;
    return draft;
  }

  return draft;
}
export function handleRight(draft, action) {
  const [x, y] = action.payload.pos;
  const { visited } = draft;

  if (visited[`${x},${y}`] === MINE_ACTIVED) return;

  if (visited[`${x},${y}`] === MINE_DOUBT) {
    visited[`${x},${y}`] = MINE_NONE;
  } else if (visited[`${x},${y}`] === MINE_FLAG) {
    visited[`${x},${y}`] = MINE_DOUBT;
  } else {
    visited[`${x},${y}`] = MINE_FLAG;
  }

  return draft;
}

export function handleBoth(draft, action) {}
