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
    const row = line.split("").map((x) => (x === "L" ? 1 : 0));
    rows.push(row);
  }
  return rows;
}

const hardcodedRows = [];
hardcodedRows.push([2, 0, 1, 1, 0, 1, 1, 0, 1, 1]);
hardcodedRows.push([1, 2, 1, 1, 1, 1, 1, 0, 1, 1]);
hardcodedRows.push([1, 0, 1, 0, 1, 0, 0, 1, 0, 0]);
hardcodedRows.push([1, 1, 1, 1, 0, 1, 1, 0, 1, 1]);
hardcodedRows.push([1, 0, 1, 1, 0, 1, 1, 0, 1, 1]);
hardcodedRows.push([1, 0, 1, 1, 2, 1, 1, 0, 1, 1]);
hardcodedRows.push([0, 0, 1, 0, 1, 0, 0, 0, 0, 0]);
hardcodedRows.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
hardcodedRows.push([1, 0, 1, 1, 1, 1, 1, 1, 0, 1]);
hardcodedRows.push([1, 0, 1, 1, 1, 1, 1, 0, 1, 1]);
function simulateFrames(rows) {
  const frames = [];

  frames.push(rows);
  frames.push(hardcodedRows);

  return frames;
}

module.exports = function getInputs() {
  // get stuff from the outside world
  const rows = parse(sampleData);
  const frames = simulateFrames(rows);

  return { frames, rows };
};
