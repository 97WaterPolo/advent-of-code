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

  let hasDrawn = false;
  p5.draw = () => {
    if (hasDrawn) return;
    hasDrawn = true;

    p5.textSize(50);
    p5.textAlign(p5.CENTER, p5.CENTER);
    const gridSize = 60;
    const margin = gridSize * 0.7;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (p5.random() > 0.7) {
          p5.text("·", margin + col * gridSize, margin + row * gridSize);
        } else {
          p5.text("⭐", margin + col * gridSize, margin + row * gridSize);
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
