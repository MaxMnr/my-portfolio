let G = 10;
let dt = 1;

let bodies = [];

let run = true;

let colors = ["red", "green", "blue", "cyan"];

function setup() {
  let can = createCanvas(windowWidth, windowHeight);
  can.parent("background-animation");

  bodies = [];
  let shift = random(0, PI);
  let R = random(150, 300);
  for (let i = 0; i < 3; i++) {
    bodies.push(
      new Body(
        R * cos(((2 * PI) / 3) * i + shift),
        R * sin(((2 * PI) / 3) * i + shift),
        -1 * sin(((2 * PI) / 3) * i + shift),
        (1 - random(0, 0.001)) * cos(((2 * PI) / 3) * i + shift),
        100,
        colors[i]
      )
    );
  }
}

function draw() {
  background("#242629");
  //background(0);
  translate(width / 2, height / 2);
  scale(1, -1);

  for (let body of bodies) {
    body.show();
  }

  if (run) {
    for (let body of bodies) {
      body.updateVel();
    }
    for (let body of bodies) {
      body.updatePos();
    }
  }
  let count = 0;
  for (let body of bodies) {
    if (
      body.positions[0].x > width / 2 ||
      body.positions[0].x < -width / 2 ||
      body.positions[0].y > height / 2 ||
      body.positions[0].y < -height / 2
    ) {
      count++;
    }
  }
  if (count == bodies.length) {
    setup();
  }
}

class Body {
  constructor(x, y, vx, vy, mass, col) {
    this.pos = createVector(x, y);
    this.vel_init = createVector(vx, vy);
    this.mass = mass;

    this.vel = createVector(vx, vy);

    this.positions = [createVector(x, y)];
    this.col = col;
  }

  show() {
    push();
    fill(this.col);
    circle(this.pos.x, this.pos.y, 30);
    pop();
    for (let i = 0; i < this.positions.length - 1; i++) {
      push();
      stroke(this.col);
      strokeWeight(map(i, 1, this.positions.length, 0.1, 6));
      line(this.positions[i].x, this.positions[i].y, this.positions[i + 1].x, this.positions[i + 1].y);
      pop();
    }
  }

  updateVel() {
    for (let body of bodies) {
      if (body != this) {
        let d = dist(body.pos.x, body.pos.y, this.pos.x, this.pos.y);

        let dir = createVector((body.pos.x - this.pos.x) / d, (body.pos.y - this.pos.y) / d);

        let force = createVector(
          (dir.x * G * body.mass * this.mass) / d ** 2,
          (dir.y * G * body.mass * this.mass) / d ** 2
        );

        let acceleration = createVector(force.x / this.mass, force.y / this.mass);

        this.vel = createVector(this.vel.x + acceleration.x * dt, this.vel.y + acceleration.y * dt);
      }
    }
  }

  updatePos() {
    this.pos.add(this.vel.mult(dt));
    this.positions.push(createVector(this.pos.x, this.pos.y));
    if (this.positions.length > 500) {
      this.positions.shift();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.9);
}

