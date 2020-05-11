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
    visited[`${x},${y}`] = MINE_ACTIVED;
    draft.gameOver = true;
    return draft;
  } else {
    // TODO: 解决递归的
    visitPosWithRecursion(draft, [x, y]);
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

export function visitPosWithRecursion(draft, pos) {
  const { mines } = draft;
  const [x, y] = pos;
  const vLen = mines.length;
  const hLen = mines[0].length;

  // 已标记，不在执行后续判断
  if (!!draft.visited[`${x},${y}`]) {
    return;
  }
  // 未标记，且为数字，显示数字结束
  else if (!!mines[x][y]) {
    draft.visited[`${x},${y}`] = MINE_ACTIVED;
    return;
  }

  draft.visited[`${x},${y}`] = MINE_ACTIVED;

  // 上
  if (x - 1 >= 0) {
    visitPosWithRecursion(draft, [x - 1, y]);
  }
  // 下
  if (x + 1 < vLen) {
    visitPosWithRecursion(draft, [x + 1, y]);
  }

  // 左

  if (y - 1 >= 0) {
    visitPosWithRecursion(draft, [x, y - 1]);
  }
  // 右

  if (y + 1 < hLen) {
    visitPosWithRecursion(draft, [x, y + 1]);
  }

  // 左上
  if (x - 1 >= 0 && y - 1 >= 0) {
    visitPosWithRecursion(draft, [x - 1, y - 1]);
  }

  // 右下

  if (x + 1 < vLen && y + 1 < hLen) {
    visitPosWithRecursion(draft, [x + 1, y + 1]);
  }

  // 右上
  if (x - 1 >= 0 && y + 1 < hLen) {
    visitPosWithRecursion(draft, [x - 1, y + 1]);
  }

  // 左下

  if (x + 1 < vLen && y - 1 < hLen) {
    visitPosWithRecursion(draft, [x + 1, y - 1]);
  }
}
