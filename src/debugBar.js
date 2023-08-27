class DebugBar extends Text {
  constructor(screen) {
    super("0", 0, screen.height - 5, "#ffffff", { animate: 0 });
    this.screen = screen;
    this.lastSize = 3;
    this.frame = 0;
    this.frameTimeHistory = [];
  }

  get fps() {
    let average =
      this.frameTimeHistory.reduce((prev, current) => {
        return prev + current;
      }, 0) / this.frameTimeHistory.length;
    return Math.floor(1 / average);
  }

  render(screen) {
    let currentTime = Date.now().valueOf();
    if (this.time !== undefined) {
      let frametime = (currentTime - this.time) / 1000;
      this.frameTimeHistory.push(frametime);
    }
    this.frameTimeHistory = this.frameTimeHistory.slice(-10);
    this.time = currentTime;

    screen.clear(0, this.screen.height - 5, this.lastSize * 6, 5);
    // console.log("PAGE IS :", this.screen.page);
    this.setContent(
      `QUEUE : ${this.screen.page.renderQueue.length} | SCREEN : ${this.screen.width
      } ${this.screen.height} | MOUSE : ${this.screen.mouse.x} ${this.screen.mouse.y
      } ${this.screen.mouse.down ? "DOWN" : "UP"} | FPS : ${this.fps}`
    );
    while (this.index < this.content.length) {
      this.renderLetter(screen);
      this.index++;
    }
    this.lastSize = this.content.length;
    this.reset();
  }
}
