let time = 0;
let z_ = 0;

function setup() {
  let can = createCanvas(windowWidth * 0.98, windowHeight);
  can.parent("background-animation");
}

function draw() {
  background("#16161a");
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(1);
  beginShape();
  fill("#7f5af0");
  let noise_max = constrain(map(dist(mouseX, mouseY, width / 2, height / 2), 0, width / 2, 2, 6), 5, 20);
  let r_max = map(dist(mouseX, mouseY, width / 2, height / 2), 0, width / 2, 300, height * 0.6);
  let dangle = 0.1;
  for (let angle = 0; angle < TWO_PI; angle += (dangle * PI) / 180) {
    let x_ = map(cos(angle + time), -1, 1, 0, noise_max);
    let y_ = map(sin(angle + time), -1, 1, 0, noise_max);
    // Calculate the noise value at that position
    let r = constrain(
      map(noise(x_, y_, z_), 0, 1, 200, r_max),
      min(height / 4, width / 4),
      min(height / 2, width / 2) - 50
    );
    // Convert to cartesian coordinates
    let x = r * cos(angle);
    let y = r * sin(angle);
    // Set the vertex
    vertex(x, y);
  }
  endShape(CLOSE);
  //time += 0.03;
  z_ += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth * 0.98, windowHeight);
}

