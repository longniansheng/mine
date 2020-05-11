import { MINE_NONE, MINE_ACTIVED, MINE_FLAG, MINE_DOUBT } from "../utils";

/**
 * 处理左键点击事件
 * @param {*} draft 缓存的状态
 * @param {*} action 动作触发的数据
 */
export function handleLeft(draft, action) {
  const [x, y] = action.payload.pos;
  const { mines, visited } = draft;

  // 如果已经点击或做了标记，不做处理
  if (!!visited[`${x},${y}`]) {
    return draft;
  }
  // 如果是雷，直接结束游戏
  else if (mines[x][y] === 9) {
    draft.gameOver = true;
    return draft;
  }
  // 如果是非0数字，将其置为已点击
  else if (mines[x][y] !== 0) {
    visited[`${x},${y}`] = MINE_ACTIVED;
  }

  return draft;
}

/**
 * 处理右键点击事件
 * @param {*} draft 缓存的状态
 * @param {*} action 动作触发的数据
 */
export function handleRight(draft, action) {
  const [x, y] = action.payload.pos;
  const { visited } = draft;

  // 如果已经处于点开状态，不做处理
  if (visited[`${x},${y}`] === MINE_ACTIVED) return draft;

  // 如果标记为问号，取消标记
  if (visited[`${x},${y}`] === MINE_DOUBT) {
    visited[`${x},${y}`] = MINE_NONE;
  }
  // 如果是标记状态，标记为问号
  else if (visited[`${x},${y}`] === MINE_FLAG) {
    visited[`${x},${y}`] = MINE_DOUBT;
  }
  // 如果未做标记，打上标记
  else {
    visited[`${x},${y}`] = MINE_FLAG;
  }

  return draft;
}

/**
 * 左右键同时点击事件
 * @param {*} draft 缓存的状态
 * @param {*} action 动作触发的数据
 */
export function handleBoth(draft, action) {}
