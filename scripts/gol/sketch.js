let gol;
let widgets;
let jsons;
let jsons_names = ["none", "glyder", "osc", "weekender", "glyder gun", "eater"];

function preload() {
  jsons = loadJSON("scripts/gol/masks.json");
}

function setup() {
  let canvasDiv = document.getElementById("project-gol-animation");
  let w = canvasDiv.offsetWidth;
  let h = canvasDiv.offsetHeight;
  let can = createCanvas(w, int(w / 2));
  can.parent("project-gol-animation");
  gol = new GameOfLife(25, 20);
  widgets = new Widgets();
}

function draw() {
  background("#16161a");
  gol.show();

  if (mouseOnScreen()) {
    gol.update();
  }

  widgets.update();

  if (gol.running == 1) {
    gol.run();
  } else {
    frameRate(30);
  }
}

function mouseOnScreen() {
  let x = mouseX;
  let y = mouseY;
  return x > 0 && x < width && y > 0 && y < height;
}

function mousePressed() {
  if (mouseOnScreen()) {
    gol.mousePressed(mouseX, mouseY);
  }
}

