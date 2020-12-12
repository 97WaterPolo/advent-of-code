const p5 = require("p5");
const p5module = require("p5");

let canvas = null;
let inputs;

let width = window.innerWidth;
let height = window.innerHeight;
const gridSize = 60;
const margin = gridSize * 0.7;

function drawChair(p5, square, col, row) {
  if (square === 0) {
    drawGlyph(p5, "·", col, row);
  } else if (square === 1) {
    drawGlyph(p5, "🪑", col, row);
  } else if (square === 2) {
    drawGlyph(p5, "🧙‍♂️", col, row);
  }
}

function drawGlyph(p5, glyph, col, row) {
  p5.text(glyph, margin + col * gridSize, margin + row * gridSize);
}

function drawStatus(p5, frameNumber, totalFrames, occupiedSeats) {
  const midpointX = width / 2;
  const midpointY = height / 2;
  p5.text(
    `${frameNumber} of ${totalFrames}\n${occupiedSeats} seats occupied`,
    midpointX,
    midpointY
  );
}

function countOccupiedSeats(rows) {
  let occupiedSeats = 0;
  for (row of rows) {
    occupiedSeats += row.filter((x) => x === 2).length;
  }

  return occupiedSeats;
}

const ticksPerFrame = 30;
function drawGameOfLife(p5, tick) {
  const frame = Math.floor(tick / ticksPerFrame);
  if (frame > inputs.frames.length - 1) return;

  p5.clear();
  const rows = inputs.frames[frame];

  p5.textSize(gridSize * 0.8);
  p5.textAlign(p5.CENTER, p5.CENTER);

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      const square = rows[row][col];

      drawChair(p5, square, col, row);
    }
  }
  drawStatus(p5, frame + 1, inputs.frames.length, countOccupiedSeats(rows));
}

let sketch = (p5) => {
  p5.setup = () => {
    p5.frameRate(60);
    canvas = document.getElementsByTagName("canvas")[0];
    p5.createCanvas(width, height);
  };

  let tick = 0;
  p5.draw = () => {
    drawGameOfLife(p5, tick);
    tick++;
  };
};

module.exports.init = function init(i) {
  inputs = i;
  // ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
  new p5module(sketch);
  // ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
};
