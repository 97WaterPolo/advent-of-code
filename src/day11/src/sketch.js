const p5module = require("p5");

let canvas = null;
let inputs;

let width = window.innerWidth;
let height = window.innerHeight;
let gridSize = 60;
let margin = gridSize * 0.5;

function countOccupiedSeats(rows) {
  let occupiedSeats = 0;
  for (row of rows) {
    occupiedSeats += row.filter((x) => x === 2).length;
  }

  return occupiedSeats;
}

function drawChair(p5, square, col, row) {
  if (square === 0) {
    drawGlyph(p5, "·", col, row);
  } else if (square === 1) {
    drawGlyph(p5, "🪑", col, row);
  } else if (square === 2) {
    drawGlyph(p5, "🪑", col, row);
    drawGlyph(p5, "🧙‍♂️", col, row, true);
  }
}

function drawGlyph(p5, glyph, col, row, drawSittingInChair) {
  // because I am tellking p5.js to center text, it is using my coordinates
  // as the CENTER POINT of the text. So if I want to apply a margin,
  // I need to account for the extra space I need to center the text.
  //
  // It occurs to me now that the value of the text centering is not
  // all that great if I have to go and manually account for it anyway
  const textMargin = margin + 0.5 * gridSize;
  if (drawSittingInChair && !inputs.useRealData) {
    p5.textSize(gridSize * 0.6);
    p5.text(glyph, textMargin + col * gridSize - 5, textMargin + row * gridSize - 15);
  } else {
    p5.textSize(gridSize * 0.8);
    p5.text(glyph, textMargin + col * gridSize, textMargin + row * gridSize);
  }
}

function drawStatus(p5, rows, frameNumber, totalFrames, occupiedSeats) {
  const midpointX = margin + (rows[0].length * gridSize) / 2;
  const midpointY = margin + (0.6 + rows.length) * gridSize;
  const rectWidth = 400;
  const rectHeight = 100;

  p5.noStroke();
  p5.fill(255, 255, 0);
  p5.rect(midpointX - rectWidth / 2, midpointY - rectHeight / 2, rectWidth, rectHeight);
  p5.fill(255, 0, 255);
  p5.rect(
    midpointX - rectWidth / 2 + 10,
    midpointY - rectHeight / 2 + 10,
    rectWidth,
    rectHeight
  );
  p5.fill(0, 255, 255);
  p5.rect(
    midpointX - rectWidth / 2 + 20,
    midpointY - rectHeight / 2 + 20,
    rectWidth,
    rectHeight
  );
  p5.fill(255);
  p5.stroke(0);
  p5.strokeWeight(3);
  p5.textSize(35);
  p5.textStyle(p5.BOLD);
  p5.text(
    `generation ${frameNumber} of ${totalFrames}\n${occupiedSeats} seats occupied`,
    midpointX + 20,
    midpointY + 20
  );
}

function drawBackground(p5, rows) {
  const barSize = 20;
  const barsToDraw = rows.length * gridSize;
  const padding = margin / 2;
  p5.rotate(-45);
  for (let i = -barsToDraw; i < barsToDraw; i++) {
    p5.fill(255, 0, 0);
    if (i % 2 === 0) p5.rect(i * barSize, 0, barSize, height * 3);
  }
  p5.rotate(45);

  // fill in the grid with a vanilla white background
  p5.fill(255);

  p5.stroke(0);
  p5.strokeWeight(3);
  p5.rect(
    margin - padding,
    margin - padding,
    margin + rows[0].length * gridSize,
    margin + rows.length * gridSize
  );
}

function drawGameOfLife(p5, tick) {
  gridSize = inputs.useRealData ? 9 : 60;
  margin = 80;
  const ticksPerFrame = inputs.useRealData ? 1 : 30;
  const frame = Math.floor(tick / ticksPerFrame);
  if (frame > inputs.frames.length - 1) return;

  p5.clear();

  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.noStroke();
  p5.textStyle(p5.NORMAL);

  const rows = inputs.frames[frame];

  drawBackground(p5, rows);

  p5.fill(127);
  p5.noStroke();
  p5.textStyle(p5.NORMAL);
  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      const square = rows[row][col];

      drawChair(p5, square, col, row);
    }
  }
  drawStatus(p5, rows, frame + 1, inputs.frames.length, countOccupiedSeats(rows));
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
