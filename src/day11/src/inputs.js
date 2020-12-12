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

module.exports = function getInputs() {
  // get stuff from the outside world
  const rows = parse(sampleData);
  return { rows };
};
