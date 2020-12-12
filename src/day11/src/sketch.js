const p5module = require("p5");

let canvas = null;
let inputs;

let width = window.innerWidth;
let height = window.innerHeight;

let sketch = (p5) => {
  p5.setup = () => {
    p5.frameRate(60);
    canvas = document.getElementsByTagName("canvas")[0];
    p5.createCanvas(width, height);
  };

  const ticksPerFrame = 60;
  let tick = 0;
  let frame = 0;
  p5.draw = () => {
    tick++;
    const frame = Math.floor(tick / ticksPerFrame);
    if (frame > inputs.frames.length - 1) return;
    const rows = inputs.frames[frame];

    p5.textSize(50);
    p5.textAlign(p5.CENTER, p5.CENTER);
    const gridSize = 60;
    const margin = gridSize * 0.7;
    for (let row = 0; row < rows.length; row++) {
      for (let col = 0; col < rows[row].length; col++) {
        const square = rows[row][col];

        if (square === 0) {
          p5.text("·", margin + col * gridSize, margin + row * gridSize);
        } else if (square === 1) {
          p5.text("🪑", margin + col * gridSize, margin + row * gridSize);
        } else if (square === 2) {
          p5.text("🧙‍♂️", margin + col * gridSize, margin + row * gridSize);
        }
      }
    }
  };
};

module.exports.init = function init(i) {
  inputs = i;
  // ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
  new p5module(sketch);
  // ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
};
