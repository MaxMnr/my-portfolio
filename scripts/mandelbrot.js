let maxIterations = 50;
let minIterations = 50;
let xbounds = [-2, 1];
let ybounds = [-1, 1];

let history = [{ xb: xbounds, yb: ybounds, iter: maxIterations }];

let py = 0;

let zoom;
let widgets;

function setup() {
  let can = createCanvas(windowWidth * 0.5, windowHeight * 0.7);
  can.parent("project-mandelbrot-animation");
  pixelDensity(1);

  zoom = new Zoom();
  widgets = new Widgets();
}

function draw() {
  widgets.update();

  if (py < height) {
    loadPixels();

    for (let sub_py = 0; sub_py < 10; sub_py++) {
      for (let px = 0; px < width; px++) {
        let n = 0;
        let c_re = map(px, 0, width, history[history.length - 1].xb[0], history[history.length - 1].xb[1]);
        let c_im = map(py, 0, height, history[history.length - 1].yb[0], history[history.length - 1].yb[1]);
        let c = new Complex(c_re, c_im);
        let z = new Complex(0, 0);

        while (z.getNorm() <= 10 * 10 && n < history[history.length - 1].iter) {
          let new_re = z.re * z.re - z.im * z.im + c.re;
          let new_im = 2 * z.re * z.im + c.im;
          z = new Complex(new_re, new_im);
          n += 1;
        }

        let index = (px + py * width) * 4;
        let col = getColor(n);
        pixels[index] = red(col);
        pixels[index + 1] = green(col);
        pixels[index + 2] = blue(col);
        pixels[index + 3] = 255;
      }
      py += 1;
    }
    updatePixels();
  }
}

function getColor(iterations) {
  if (iterations === history[history.length - 1].iter) {
    return color(0, 0, 0);
  } else {
    let potential = map(iterations, 0, history[history.length - 1].iter, 0, 1);

    let colorGradient = [
      { pos: 0.0, color: color(0, 0, 0) }, // Black
      { pos: 0.2, color: color(255, 0, 0) }, // Red
      { pos: 0.4, color: color(255, 255, 0) }, // Yellow
      { pos: 0.6, color: color(0, 255, 0) }, // Green
      { pos: 0.8, color: color(0, 0, 255) }, // Blue
      { pos: 1.0, color: color(255, 255, 255) }, // White
    ];

    let colorIndex = 0;
    while (colorGradient[colorIndex + 1].pos < potential) {
      colorIndex++;
    }

    let startColor = colorGradient[colorIndex].color;
    let endColor = colorGradient[colorIndex + 1].color;
    let startPos = colorGradient[colorIndex].pos;
    let endPos = colorGradient[colorIndex + 1].pos;

    let t = map(potential, startPos, endPos, 0, 1);
    let col = lerpColor(startColor, endColor, t);

    return col;
  }
}

class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  getNorm() {
    return sqrt(this.re * this.re + this.im * this.im);
  }
}

function addComplex(c1, c2) {
  return new Complex(c1.re + c2.re, c1.im + c2.im);
}

function multComplex(c1, c2) {
  return new Complex(c1.re * c2.re - c1.im * c2.im, c1.im * c2.re + c1.re * c2.im);
}
class Widgets {
  constructor() {
    this.buttonReset = createButton("Reset");
    this.buttonReset.mousePressed(this.resetB);
    this.iterations = createSlider(0, 1000, 50, 10);

    this.buttonBack = createButton("Return");
    this.buttonBack.mousePressed(this.backB);

    this.buttonReset.parent("project-mandelbrot-widgets");
    this.buttonBack.parent("project-mandelbrot-widgets");
    this.iterations.parent("project-mandelbrot-widgets");
  }
  update() {
    //maxIterations = this.sliderIterations.value();
    if (this.iterations.value() !== maxIterations) {
      maxIterations = this.iterations.value();
      history.push({ xb: history[history.length - 1].xb, yb: history[history.length - 1].yb, iter: maxIterations });

      py = 0;
    }
  }

  backB() {
    if (history.length > 1) {
      history.splice(history.length - 1);
      py = 0;
    }
  }
  resetB() {
    while (history.length > 1) {
      history.splice(history.length - 1);
      py = 0;
    }
  }
}

function resetSketch() {}

class iterationSelector {
  constructor() {
    this.thousand = createSelect();
    this.hundred = createSelect();
    this.ten = createSelect();
    this.one = createSelect();

    for (let i = 0; i < 10; i++) {
      this.thousand.option(str(i));
      this.hundred.option(str(i));
      this.ten.option(str(i));
      this.one.option(str(i));
    }
    this.ten.selected("2");
  }

  getValue() {
    return int(this.thousand.value() + this.hundred.value() + this.ten.value() + this.one.value());
  }
}

class Zoom {
  constructor() {
    this.start = createVector(xbounds[0], ybounds[0]);
    this.end = createVector(xbounds[1], ybounds[1]);
  }
  update() {
    let xStart = map(this.start.x, 0, width, history[history.length - 1].xb[0], history[history.length - 1].xb[1]);
    let xEnd = map(this.end.x, 0, width, history[history.length - 1].xb[0], history[history.length - 1].xb[1]);
    let yStart = map(this.start.y, 0, height, history[history.length - 1].yb[0], history[history.length - 1].yb[1]);
    let yEnd = map(this.end.y, 0, height, history[history.length - 1].yb[0], history[history.length - 1].yb[1]);

    history.push({ xb: [xStart, xEnd], yb: [yStart, yEnd], iter: maxIterations });

    draw();
  }
}

function mouseOnCanvas() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}

function mouseDragged() {
  if (mouseOnCanvas() && py == height) {
    updatePixels();
    let size = mouseX - zoom.start.x;
    noFill();
    stroke("white");
    strokeWeight(2);
    square(zoom.start.x, zoom.start.y, size);
  }
}

function mousePressed() {
  if (mouseOnCanvas() && py == height) {
    zoom.start = createVector(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (mouseOnCanvas() && py == height) {
    let size = mouseX - zoom.start.x;
    zoom.end = createVector(zoom.start.x + size, zoom.start.y + size);
    zoom.update();
    py = 0;
  }
}

function windowResized() {
  //resizeCanvas(windowWidth*0.6, windowHeight*0.8);
}
