/**
 * 初始化雷区信息
 * @param {*} hLen 水平区域数量
 * @param {*} vLen 垂直区域数量
 * @param {*} len 雷的数量
 */
export function initMines(hLen = 9, vLen = 9, len = 10) {
  let mines = [];
  for (let i = 0; i < vLen; i++) {
    let temp = [];
    for (let j = 0; j < hLen; j++) {
      temp.push(0);
    }
    mines.push(temp);
  }
  const pos = initPos(hLen, vLen);
  const danPos = shuffle(pos, len);

  const result = checkAndVoluation(mines, danPos);
  return result;
}

/**
 * 生成雷区坐标
 * @param {*} hLen 水平的数量
 * @param {*} vLen 垂直的数量
 */
export function initPos(hLen, vLen) {
  const posArr = Array.from({ length: vLen * hLen }).map((i, idx) => [
    parseInt(idx / vLen),
    parseInt(idx % hLen),
  ]);
  return posArr;
}

/**
 * 生成地雷的坐标集合
 * @param {*} arr 雷区坐标初始化地图数据
 * @param {*} len 雷的数量
 */
export function shuffle(arr, len) {
  const arr1 = [...arr];
  const tempArr = [];
  while (tempArr.length <= len) {
    let idx = parseInt(Math.random() * arr1.length);
    tempArr.push(arr1.splice(idx, 1)[0]);
  }

  return tempArr;
}

/**
 * 根据雷的坐标生成最终的雷区数据
 * @param {*} initArr 雷区的初始化数据
 * @param {*} danPosArr 地雷的坐标
 */
export function checkAndVoluation(initArr, danPosArr) {
  const vLen = initArr.length;
  const hLen = initArr[0].length;

  danPosArr.forEach(([x, y]) => {
    initArr[x][y] = 9;

    // 上左
    if (x - 1 >= 0 && y - 1 >= 0 && initArr[x - 1][y - 1] !== 9) {
      initArr[x - 1][y - 1] += 1;
    }
    // 上
    if (x - 1 >= 0 && initArr[x - 1][y] !== 9) {
      initArr[x - 1][y] += 1;
    }
    // 上右
    if (x - 1 >= 0 && y + 1 < hLen && initArr[x - 1][y + 1] !== 9) {
      initArr[x - 1][y + 1] += 1;
    }
    // 左
    if (y - 1 >= 0 && initArr[x][y - 1] !== 9) {
      initArr[x][y - 1] += 1;
    }
    // 右
    if (y + 1 < hLen && initArr[x][y + 1] !== 9) {
      initArr[x][y + 1] += 1;
    }
    // 左下
    if (x + 1 < vLen && y - 1 >= 0 && initArr[x + 1][y - 1] !== 9) {
      initArr[x + 1][y - 1] += 1;
    }
    // 下
    if (x + 1 < vLen && initArr[x + 1][y] !== 9) {
      initArr[x + 1][y] += 1;
    }
    // 右下
    if (x + 1 < vLen && y + 1 < hLen && initArr[x + 1][y + 1] !== 9) {
      initArr[x + 1][y + 1] += 1;
    }
  });

  return initArr;
}
