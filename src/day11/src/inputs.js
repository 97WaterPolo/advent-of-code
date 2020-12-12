const sampleData = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

function parse(input) {
  const lines = input
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x);
  const rows = [];
  for (let line of lines) {
    const row = line.split("").map((x) => (x === "L" ? SEAT_EMPTY : SQUARE_EMPTY));
    rows.push(row);
  }
  return rows;
}

// assume a & b are arrays of arrays
function same(a, b) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;

    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }

  return true;
}

function getNeighboringSquares(rows, row, col) {
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const squares = [];

  for (let offset of offsets) {
    if (
      row + offset[0] < rows.length &&
      row + offset[0] >= 0 &&
      col + offset[1] < rows[0].length &&
      col + offset[1] >= 0
    )
      squares.push(rows[row + offset[0]][col + offset[1]]);
  }

  return squares;
}

const SQUARE_EMPTY = 0;
const SEAT_EMPTY = 1;
const SEAT_OCCUPIED = 2;

function isTooCrowded(rows, row, col) {
  const squares = getNeighboringSquares(rows, row, col);

  return squares.filter((x) => x === SEAT_OCCUPIED).length >= 4;
}

function hasNoNeighbors(rows, row, col) {
  const squares = getNeighboringSquares(rows, row, col);

  return squares.every((x) => x === SEAT_EMPTY);
}

function simulateSquare(rows, row, col) {
  const square = rows[row][col];
  if (square === SQUARE_EMPTY) return SQUARE_EMPTY;

  if (square === SEAT_OCCUPIED) {
    return isTooCrowded(rows, row, col) ? SEAT_EMPTY : SEAT_OCCUPIED;
  } else if (square === SEAT_EMPTY) {
    return hasNoNeighbors(rows, row, col) ? SEAT_OCCUPIED : SEAT_EMPTY;
  } else {
    throw `invalid square ${col},${row}: ${square}`;
  }
}

function simulateNextFrame(rows) {
  const columns = rows[0].length; // assume non-jagged arrays
  const r = [];
  for (let row = 0; row < rows.length; row++) {
    const rowArray = [];
    for (let col = 0; col < columns; col++) {
      rowArray.push(simulateSquare(rows, row, col));
    }
    r.push(rowArray);
  }

  return r;
}

function simulateFrames(rows) {
  const frames = [];

  frames.push(rows);
  while (true) {
    let frame = simulateNextFrame(rows);
    if (same(frames[frames.length - 1], frame)) {
      return frames;
    } else {
      frames.push(frame);
    }
  }

  return frames;
}

module.exports = function getInputs() {
  // get stuff from the outside world
  const rows = parse(sampleData);
  const frames = simulateFrames(rows);

  return { frames, rows };
};
