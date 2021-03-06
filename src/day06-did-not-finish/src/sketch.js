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

  let tick = 0;
  const people = ["🧙‍♂️", "👹", "🐸", "🎃"];
  const person = p5.random(people);
  p5.draw = () => {
    tick++;

    prepareToDraw(p5);
    drawBars(p5, tick);

    drawRotatingJazz(p5, tick);

    drawQuestionnaireSubject(p5, person);
  };
};

module.exports.init = function init(i) {
  inputs = i;
  // ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
  new p5module(sketch);
  // ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
};
function drawBars(p5, tick) {
  const rowSize = 5;
  const maxRows = Math.ceil(height / rowSize);
  p5.fill(0);
  for (let row = 0; row < maxRows; row += 5) {
    p5.rect(0, (tick % (rowSize * 5)) + row * rowSize, width * 2, rowSize * 4);
  }
  p5.textAlign(p5.CENTER, p5.CENTER);

  p5.fill(255);
  p5.stroke(0);
}

function prepareToDraw(p5) {
  p5.clear();
  p5.noStroke();
  p5.noFill();
  // rectMode CENTER means that we are now drawing rectangles ??? relative to the center of the canvas??? I think? anyway, delete this and stuff changes
  p5.rectMode(p5.CENTER);
  p5.textSize(height * 0.6);
  p5.noStroke();
  p5.noFill();
}

function drawQuestionnaireSubject(p5, person) {
  p5.textSize(height / 7);
  p5.text("‍️✅", width / 2, height * 0.9);
  p5.textSize(height / 2);
  p5.text(person, width / 2, height / 2);
}

function drawRotatingJazz(p5, tick) {
  p5.translate(width / 2, height * 0.9);

  p5.textSize(height * 0.9);
  p5.rotate(-0.5 * p5.radians(tick));
  p5.text("💥", 0, 0);
  p5.rotate(0.5 * p5.radians(tick));

  p5.textSize(height * 0.7);
  p5.rotate(p5.radians(tick * 9));
  p5.text("💥", 0, 0);
  p5.rotate(-p5.radians(tick * 9));

  p5.textSize(height * 0.3);
  p5.rotate(-p5.radians(tick * 15));
  p5.text("💥", 0, 0);
  p5.rotate(p5.radians(tick * 15));

  p5.translate(-width / 2, -height * 0.9);
}
