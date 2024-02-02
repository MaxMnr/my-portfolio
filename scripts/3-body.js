let G = 4;
let dt = 1;

let bodies = [];

let run = true;

//let colors = ["#2cb67d", "#7f5af0", "#fffffe", "cyan"];
//let colors = [{r:44, g:182, b:125},{r:127, g:90, b:240}, {r:255, g:255, b:254} ]
let colors = [
  { r: 255, g: 100, b: 100 },
  { r: 100, g: 255, b: 100 },
  { r: 100, g: 100, b: 254 },
];

//let axis;
//let cam;

function setup() {
  let can = createCanvas(windowWidth * 0.99, windowHeight, WEBGL);
  can.parent("background-animation");
  //axis = new Axis();
  //cam = new Camera();
  frameRate(120);

  bodies = [];
  let shift = random(0, PI);
  let R = random(150, 175);
  for (let i = 0; i < 3; i++) {
    bodies.push(
      new Body(
        R * cos(((2 * PI) / 3) * i + shift),
        R * sin(((2 * PI) / 3) * i + shift),
        50 * i - 100,
        -1 * sin(((2 * PI) / 3) * i + shift),
        (1 - random(0, 0.001)) * cos(((2 * PI) / 3) * i + shift),
        0,
        100,
        colors[i]
      )
    );
  }
}

function draw() {
  background("#16161a");
  //background(0);
  //translate(width / 2, height / 2);
  //scale(1, -1);
  //cam.update();
  //axis.show();
  camera();

  let lightPosX = mouseX - width / 2;
  let lightPosY = mouseY - height / 2;
  //ambientLight(60);
  //specularColor(255, 0, 0);
  pointLight(255, 255, 255, 0, 0, 1000);
  //specularMaterial(150);
  //shininess(50);
  for (let body of bodies) {
    body.showPath();
  }
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
  constructor(x, y, z, vx, vy, vz, mass, col) {
    this.pos = createVector(x, y, z);
    this.vel_init = createVector(vx, vy, vz);
    this.mass = mass;

    this.vel = createVector(vx, vy, vz);

    this.positions = [createVector(this.pos.x, this.pos.y, this.pos.z)];
    this.col = col;
  }

  showPath() {
    for (let i = 0; i < this.positions.length - 1; i++) {
      let d = dist(this.positions[i].x, this.positions[i].y, this.positions[i].z, this.pos.x, this.pos.y, this.pos.z);
      if (d > 0) {
        push();
        noStroke();
        let s = map(log(i), log(1), log(this.positions.length), 10, 10);

        let r = map(i, 0, this.positions.length - 20, 22, this.col.r);
        let g = map(i, 0, this.positions.length - 20, 22, this.col.g);
        let b = map(i, 0, this.positions.length - 20, 26, this.col.b);

        let clr = color(r, g, b);
        clr.setAlpha(map(i, 0, this.positions.length - 20, 0, 40));
        fill(clr);
        translate(this.positions[i].x, this.positions[i].y, this.positions[i].z);
        sphere(s);

        pop();
      }
    }
  }
  show() {
    push();

    //stroke(0);
    noStroke();
    //ambientLight(255);
    //emissiveMaterial(this.col.r, this.col.g, this.col.b);
    //shininess(20);
    //ambientMaterial(this.col.r, this.col.g, this.col.b);
    fill(color(this.col.r, this.col.g, this.col.b));
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(20);
    pop();
  }

  updateVel() {
    for (let body of bodies) {
      if (body != this) {
        let d = dist(body.pos.x, body.pos.y, body.pos.z, this.pos.x, this.pos.y, this.pos.z);

        let dir = createVector(
          (body.pos.x - this.pos.x) / d,
          (body.pos.y - this.pos.y) / d,
          (body.pos.z - this.pos.z) / d
        );

        let force = createVector(
          (dir.x * G * body.mass * this.mass) / d ** 2,
          (dir.y * G * body.mass * this.mass) / d ** 2,
          (dir.z * G * body.mass * this.mass) / d ** 2
        );

        let acceleration = createVector(force.x / this.mass, force.y / this.mass, force.z / this.mass);

        this.vel = createVector(
          this.vel.x + acceleration.x * dt,
          this.vel.y + acceleration.y * dt,
          this.vel.z + acceleration.z * dt
        );
      }
    }
  }

  updatePos() {
    this.pos.add(this.vel.mult(dt));
    this.positions.push(createVector(this.pos.x, this.pos.y, this.pos.z));
    if (this.positions.length > 500) {
      this.positions.shift();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.9);
}

