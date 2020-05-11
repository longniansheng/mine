export function handleLeft(draft, action) {
  const [x, y] = action.payload.pos;
  const { mines } = draft;

  draft.visited[`${x},${y}`] = true;

  // 如果是雷，直接结束游戏
  if (mines[x][y] === 9) {
    draft.gameOver = true;
    return draft;
  }

  return draft;
}
export function handleRight(draft, action) {
  const [x, y] = action.payload.pos;
  const { mines } = draft;
  mines[x][y] = -2;

  return draft;
}

export function handleBoth(draft, action) {}
