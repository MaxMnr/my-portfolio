let points;
let coef;
let path;
let time;

let run;
let mouseDown;
let shift;

function setup() {
  let can = createCanvas(windowWidth * 0.5, windowHeight * 0.7);
  can.parent("project-fourier-animation");
  frameRate(60);
  shift = 0;

  buttonRun = createButton("RUN").mousePressed(start);
  buttonReset = createButton("RESET").mousePressed(reset);
  sliderSpeed = createSlider(1, 60, 40, 1);
  sliderNbrCircles = createSlider(1, 2, 2, 1);
  buttonRun.parent("project-fourier-widgets");
  buttonReset.parent("project-fourier-widgets");
  sliderSpeed.parent("project-fourier-widgets");
  sliderNbrCircles.parent("project-fourier-widgets");
  buttonRun.addClass("button");
  buttonReset.addClass("button");
  sliderSpeed.addClass("slider");
  sliderNbrCircles.addClass("slider");

  init();
}

function draw() {
  background(0);
  frameRate(sliderSpeed.value());

  if (!run) {
    if (points.length == 0) {
      push();
      fill("white");
      noStroke();
      textFont("Computer Modern");
      textSize(26);
      textAlign(CENTER, CENTER);
      text("Draw something here", width / 2, height / 2);
      pop();
    }
    if (mouseDown) {
      points.push(createVector(mouseX, mouseY));
    }

    for (let i = 0; i < points.length - 1; i++) {
      let pt1 = points[i];
      let pt2 = points[i + 1];
      stroke("white");
      strokeWeight(2);
      line(pt1.x, pt1.y, pt2.x, pt2.y);
    }
  } else {
    let x = 0;
    let y = 0;
    for (let i = 0; i < coef.length; i++) {
      let prevx = x;
      let prevy = y;

      let frequency = coef[i].freq;
      let radius = coef[i].amp;
      let arg = coef[i].phase;
      if (i <= sliderNbrCircles.value()) {
        x += radius * cos(frequency * time + arg);
        y += radius * sin(frequency * time + arg);

        if (i != 0) {
          push();
          noFill();
          stroke("white");
          strokeWeight(0.5);
          circle(prevx - shift, prevy, 2 * radius);
          line(prevx - shift, prevy, x - shift, y);
          pop();
        }
      }
    }
    path.push(createVector(x, y));

    push();
    noFill();
    beginShape();
    stroke(100);
    strokeWeight(0.6);
    line(x - shift, y, x, y);
    for (let i = 0; i < points.length; i++) {
      vertex(points[i].x, points[i].y);
    }
    endShape();
    pop();

    push();
    noFill();
    beginShape();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();
    pop();

    if (path.length > coef.length * 0.9) {
      path.shift();
    }
    time += (2 * PI) / points.length;
  }
}

function mousePressed() {
  if (mouseOnCanvas()) {
    mouseDown = true;
  }
}

function mouseReleased() {
  mouseDown = false;
}

function mouseOnCanvas() {
  return mouseX > shift && mouseX < width && (mouseY > 0) & (mouseY < height);
}

function init() {
  points = [];
  coef = [];
  path = [];
  time = 0;
  run = false;
  mouseDown = false;
  sliderSpeed.value(40);
}

function start() {
  run = true;
  coef = dft(points);
  sliderNbrCircles.attribute("max", points.length);
  sliderNbrCircles.value(points.length);
}

function reset() {
  init();
}

function dft(points) {
  let N = points.length;
  let coef = [];
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      let pt = points[n];
      let omega = (TWO_PI * k * n) / N;
      re += pt.x * cos(omega) + pt.y * sin(omega);
      im -= pt.x * sin(omega) - pt.y * cos(omega);
    }
    re = re / N;
    im = im / N;

    let freq = k;
    let amp = sqrt(re * re + im * im);
    let phase = atan2(im, re);
    coef.push({ re, im, freq, amp, phase });
  }
  //Sort the coeff by decreasing mag
  coef = coef.sort((a, b) => b.amp - a.amp);
  return coef;
}

function makeCircles(coefficients) {
  let circles = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < coefficients.length; i++) {
    let coef = coefficients[i];
    let freq = coef.freq;
    let phase = coef.phase;
    let rad = coef.amp;
    let circ = new Circle(x, y, rad, freq, phase);

    x += rad * cos(phase);
    y += rad * sin(phase);

    circles.push(circ);
  }

  return circles;
}

class Circle {
  constructor(x, y, rad, frequency, phase) {
    this.pos = createVector(x, y);
    this.rad = rad;
    this.frequency = frequency;
    this.phase = phase;
  }

  update() {
    this.pos.x = this.rad * cos(this.frequency * time + this.phase);
    this.pos.y = this.rad * sin(this.frequency * time + this.phase);
  }

  show() {
    push();
    noFill();
    //line(this.pos.x, this.pos.y,
    //   this.pos.x + this.rad * cos(this.phase),
    // this.pos.y + this.rad * sin(this.phase));
    circle(this.pos.x, this.pos.y, 2 * this.rad);
    pop();
  }
}

