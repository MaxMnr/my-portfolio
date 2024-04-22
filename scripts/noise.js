let time = 0;
let z_ = 0;

function setup() {
  let can = createCanvas(windowWidth * 0.98, windowHeight);
  can.parent("background-animation");
}

function draw() {
  background("#16161a");
  translate(width / 2, height / 2);
  stroke("#242629");
  strokeWeight(2);

  beginShape();
  fill("#7f5af0");

  let noise_max = 3;

  let mouse_x = mouseX - width / 2;
  let mouse_y = mouseY - height / 2;
  let r_min = map(mouse_x ** 2 + mouse_y ** 2, 0, (width ** 2 + height ** 2) / 2, 100, 200);
  let r_max = map(mouse_x ** 2 + mouse_y ** 2, 0, (width ** 2 + height ** 2) / 2, 200, height);
  r_min = constrain(r_min, 100, 200);
  r_max = constrain(r_max, 200, 400);
  let dangle = 0.1;

  for (let angle = 0; angle < TWO_PI; angle += (dangle * PI) / 180) {
    let x_ = map(cos(angle + time), -1, 1, 0, noise_max);
    let y_ = map(sin(angle + time), -1, 1, 0, noise_max);

    // Calculate the noise value at that position
    let r = map(noise(x_, y_, z_), 0, 1, r_min, r_max);
    r = constrain(r, 0, height);
    // Convert to cartesian coordinates
    let x = r * cos(angle);
    let y = r * sin(angle);
    // Set the vertex
    vertex(x, y);
  }
  endShape(CLOSE);
  let dt = map(mouse_x ** 2 + mouse_y ** 2, 0, (width ** 2 + height ** 2) / 2, 0.001, 0.01);
  dt = constrain(dt, 0.005, 0.01);
  time += dt;
  let dz = map(mouse_x ** 2 + mouse_y ** 2, 0, (width ** 2 + height ** 2) / 2, 0.003, 0.02);
  z_ += dz;
}

function windowResized() {
  resizeCanvas(windowWidth * 0.98, windowHeight);
}

