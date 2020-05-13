import { MINE_NONE, MINE_ACTIVED, MINE_FLAG, MINE_DOUBT, DIRS } from "../utils";

/**
 * 处理左键点击事件
 * @param {*} draft 缓存的状态
 * @param {*} action 动作触发的数据
 */
export function handleLeft(draft, pos) {
  const [x, y] = pos;
  const { mines, visited } = draft;
  const vLen = mines.length;
  const hLen = mines[0].length;

  // 如果已经点击或做了标记，不做处理
  if (!!visited[`${x},${y}`]) {
    return;
  }
  // 如果是雷，直接结束游戏
  if (mines[x][y] === 9) {
    draft.visited[`${x},${y}`] = MINE_ACTIVED;
    draft.gameOver = true;
    return;
  } else if (!!mines[x][y]) {
    draft.visited[`${x},${y}`] = MINE_ACTIVED;
    return;
  } else {
    draft.visited[`${x},${y}`] = MINE_ACTIVED;

    for (let i = 0; i < DIRS.length; i++) {
      const l = x + DIRS[i][0];
      const t = y + DIRS[i][1];

      if (l >= 0 && t >= 0 && l < hLen && t < vLen) {
        handleLeft(draft, [l, t]);
      }
    }
  }
}

/**
 * 处理右键点击事件
 * @param {*} draft 缓存的状态
 * @param {*} action 动作触发的数据
 */
export function handleRight(draft, action) {
  console.log("step in handleright function");
  const [x, y] = action.payload.pos;
  const { visited } = draft;

  // 如果已经处于点开状态，不做处理
  if (visited[`${x},${y}`] === MINE_ACTIVED) return;

  // 如果标记为问号，取消标记
  if (visited[`${x},${y}`] === MINE_DOUBT) {
    draft.visited[`${x},${y}`] = MINE_NONE;
  }
  // 如果是标记状态，标记为问号
  else if (visited[`${x},${y}`] === MINE_FLAG) {
    draft.visited[`${x},${y}`] = MINE_DOUBT;
  }
  // 如果未做标记，打上标记
  else {
    draft.visited[`${x},${y}`] = MINE_FLAG;
  }
}

/**
 * 左右键同时点击事件
 * @param {*} draft 缓存的状态
 * @param {*} action 动作触发的数据
 */
export function handleBoth(draft, action) {
  return draft;
}
