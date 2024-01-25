let res = 10;

let spins = [-1, 1];
let grid = [];
let row, col;

let sliderTemp;
let T;
let run = 1;

function setup() {
  let can = createCanvas(500, 500);
  can.parent("project-ising-animation");

  buttonStart = createButton("Start").mousePressed(() => (run = (run + 1) % 2));
  buttonReset = createButton("Reset").mousePressed(reset);
  sliderTemp = createSlider(0.01, 10, 1, 0.1);

  buttonStart.parent("project-ising-widgets");
  buttonReset.parent("project-ising-widgets");
  sliderTemp.parent("project-ising-widgets");

  frameRate(20);

  col = width / res;
  row = height / res;

  for (let i = 0; i < row + 1; i++) {
    let new_row = [];
    for (let j = 0; j < col + 1; j++) {
      new_row.push(spins[int(random(2))]);
    }
    grid.push(new_row);
  }
}

function draw() {
  background(0);

  T = sliderTemp.value();

  if (run == 1) {
    //Simulate the evolution of the system using Glauber Dynamics
    for (let i = 0; i < grid.length * grid[0].length; i++) {
      let x = int(random(grid[0].length));
      let y = int(random(grid.length));
      let part = grid[y][x];
      let S =
        grid[y][mod(x + 1, grid[0].length)] +
        grid[y][mod(x - 1, grid[0].length)] +
        grid[mod(y + 1, grid.length)][x] +
        grid[mod(y - 1, grid.length)][x];
      let dE = 2 * grid[y][x] * S;
      let proba = 1 / (1 + exp(dE / T));
      if (random(1) < proba) {
        grid[y][x] *= -1;
      }
    }
  }

  //Display the grid using Marching Squares
  for (let i = 0; i < row + 1; i++) {
    for (let j = 0; j < col + 1; j++) {
      push();
      strokeWeight(1);
      if (grid[i][j] == -1) {
        stroke("blue");
        noFill();
        circle(j * res, i * res, res / 2);
        point(j * res, i * res);
      }
      if (grid[i][j] == 1) {
        stroke("red");
        cross(j * res, i * res, res / 2);
      }
      //point(j * res + res/2, i * res + res/2)
      pop();

      let TL = grid[i][j];
      let TR = grid[i][mod(j + 1, grid.length)];
      let DR = grid[mod(i + 1, grid[0].length)][mod(j + 1, grid.length)];
      let DL = grid[mod(i + 1, grid[0].length)][j];

      let squareType = getSquareType(TL, TR, DR, DL);

      let a = createVector(j * res + res / 2, i * res);
      let b = createVector(j * res + res, i * res + res / 2);
      let c = createVector(j * res + res / 2, i * res + res);
      let d = createVector(j * res, i * res + res / 2);

      stroke("white");
      switch (squareType) {
        case 0:
          break;
        case 1:
          drawLine(c, d);
          break;
        case 2:
          drawLine(b, c);
          break;
        case 3:
          drawLine(b, d);
          break;
        case 4:
          drawLine(a, b);
          break;
        case 5:
          drawLine(a, d);
          drawLine(b, c);
          break;
        case 6:
          drawLine(a, c);
          break;
        case 7:
          drawLine(a, d);
          break;
        case 8:
          drawLine(a, d);
          break;
        case 9:
          drawLine(a, c);
          break;
        case 10:
          drawLine(a, b);
          drawLine(c, d);
          break;
        case 11:
          drawLine(a, b);
          break;
        case 12:
          drawLine(b, d);
          break;
        case 13:
          drawLine(b, c);
          break;
        case 14:
          drawLine(c, d);
          break;
        case 15:
          break;
      }
    }
  }
}

function reset() {
  grid = [];
  for (let i = 0; i < row + 1; i++) {
    let new_row = [];
    for (let j = 0; j < col + 1; j++) {
      new_row.push(spins[int(random(2))]);
    }
    grid.push(new_row);
  }
}

function getSquareType(c1, c2, c3, c4) {
  let b1 = c1;
  let b2 = c2;
  let b3 = c3;
  let b4 = c4;

  if (b1 == -1) {
    b1 = 0;
  }
  if (b2 == -1) {
    b2 = 0;
  }
  if (b3 == -1) {
    b3 = 0;
  }
  if (b4 == -1) {
    b4 = 0;
  }
  return int(b1 * 8 + b2 * 4 + b3 * 2 + b4 * 1);
}

function drawLine(vec1, vec2) {
  line(vec1.x, vec1.y, vec2.x, vec2.y);
}

function mod(x, m) {
  let res = x;
  while (res < 0) {
    res += m;
  }
  return res % m;
}

function cross(x, y, s) {
  line(x - s / 2, y - s / 2, x + s / 2, y + s / 2);
  line(x - s / 2, y + s / 2, x + s / 2, y - s / 2);
}

