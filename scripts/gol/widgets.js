class Widgets {
  constructor() {
    this.select = createSelect().parent("project-gol-widgets").addClass("");
    for (let name of jsons_names) {
      this.select.option(name);
    }

    this.run_button = createButton("Run")
      .mousePressed(() => (gol.running = (gol.running + 1) % 2))
      .parent("project-gol-widgets")
      .addClass("button");
    this.random_button = createButton("Random")
      .mousePressed(() => (gol.board.grid = gol.board.makeRandomGrid()))
      .parent("project-gol-widgets")
      .addClass("button");
    this.reset_button = createButton("Reset")
      .mousePressed(() => gol.reset())
      .parent("project-gol-widgets")
      .addClass("button");

    this.size_slider = createSlider(10, 200, 20, 5).parent("project-gol-widgets").addClass("slider");
    this.speed_slider = createSlider(10, 60, 10, 5).parent("project-gol-widgets").addClass("slider");

    this.save_button = createButton("save")
      .mousePressed(() => save(gol.board.grid, "s.json"))
      .parent("project-gol-widgets")
      .addClass("button");
  }

  update() {
    if (gol.board.mask.type != this.select.value()) {
      gol.board.changeMask(this.select.value());
    }
    if (gol.nrow != int(this.size_slider.value())) {
      print(gol.nrow, int(this.size_slider.value()));
      let ratio = width / height;
      //gol.nrow = int(this.size_slider.value() / ratio);
      gol.nrow = this.size_slider.value();
      gol.ncol = this.size_slider.value() * ratio;
      gol.reset();
    }

    frameRate(this.speed_slider.value());
  }
}

