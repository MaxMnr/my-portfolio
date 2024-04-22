let res;

let spins = [-1, 1];
let grid = [];
let row, col;

let sliderRes;
let sliderTemp;
let T;
let run = 0;

function setup() {
  let canvasDiv = document.getElementById("project-ising-animation");
  let w = canvasDiv.offsetWidth;
  let h = canvasDiv.offsetHeight;
  let can = createCanvas(w, w / 2);
  can.parent("project-ising-animation");

  buttonStart = createButton("Start").mousePressed(startB);
  buttonReset = createButton("Reset").mousePressed(reset);
  sliderTemp = createSlider(0.1, 5, 2.27, 0.01);
  sliderRes = createSlider(10, 100, 10, 1);

  tempText = createDiv("");
  resText = createDiv("");

  buttonStart.parent("project-ising-widgets");
  buttonReset.parent("project-ising-widgets");
  sliderTemp.parent("project-ising-widgets");
  tempText.parent("project-ising-widgets");
  sliderRes.parent("project-ising-widgets");
  resText.parent("project-ising-widgets");

  buttonStart.addClass("button");
  buttonReset.addClass("button");
  sliderTemp.addClass("slider");
  tempText.addClass("text");
  sliderRes.addClass("slider");
  resText.addClass("text");

  frameRate(20);
  res = int(sliderRes.value());
  col = 2 * res;
  row = res;
  grid = [];
  for (let i = 0; i < row + 1; i++) {
    let new_row = [];
    for (let j = 0; j < col + 1; j++) {
      new_row.push(spins[int(random(2))]);
    }
    grid.push(new_row);
  }
}
function startB() {
  run = (run + 1) % 2;
  if (run % 2 == 1) {
    buttonStart.html("Stop");
  } else {
    buttonStart.html("Start");
  }
}
function resetup() {
  grid = [];
  res = sliderRes.value();
  col = 2 * res;
  row = res;

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
  tempText.html(
    '<span style="color: #fffffe;">' +
      "Temperature: " +
      "</span>" +
      '<span style="color: #7f5af0;">' +
      str(T) +
      "</span>"
  );
  resText.html(
    '<span style="color: #fffffe;">' +
      "Grid Size: " +
      "</span>" +
      '<span style="color: #7f5af0;">' +
      str(res) +
      "</span>"
  );

  if (int(sliderRes.value()) != int(res)) {
    res = sliderRes.value();
    resetup();
  }

  if (run == 1) {
    //Simulate the evolution of the system using Glauber Dynamics
    for (let i = 0; i < grid.length * grid[0].length; i++) {
      let x = int(random(grid[0].length));
      let y = int(random(grid.length));
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
  let w = width / col;
  let h = height / row;
  for (let i = 0; i < row + 1; i++) {
    for (let j = 0; j < col + 1; j++) {
      push();
      strokeWeight(1);
      if (grid[i][j] == -1) {
        stroke("#7f5af0");
        noFill();
        circle(j * w, i * h, min(w, h) / 2);
        point(j * w, i * h);
      }
      if (grid[i][j] == 1) {
        stroke("#2cb67d");
        cross(j * w, i * h, min(w, h) / 2);
      }
      //point(j * res + res/2, i * res + res/2)
      pop();

      // Accessing neighboring cells
      let TL = grid[i][j]; // Current cell
      let TR = j < col ? grid[i][j + 1] : undefined; // Right neighbor
      let DR = i < row && j < col ? grid[i + 1][j + 1] : undefined; // Bottom-right neighbor
      let DL = i < row ? grid[i + 1][j] : undefined; // Bottom neighbor

      let squareType = getSquareType(TL, TR, DR, DL);

      let a = createVector(j * w + w / 2, i * h);
      let b = createVector(j * w + w, i * h + h / 2);
      let c = createVector(j * w + w / 2, i * h + h);
      let d = createVector(j * w, i * h + h / 2);

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

function windowResized() {
  resizeCanvas(windowHeight * 0.8, windowHeight * 0.8);
  resetup();
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

