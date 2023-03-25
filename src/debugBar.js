class DebugBar extends Text {
  constructor(screen) {
    super("0", 0, screen.height - 5, 255, 0, false);
    this.screen = screen;
    this.lastSize = 3;
  }

  render(screen) {
    screen.clear(0, this.screen.height - 5, this.lastSize * 6, 5);
    this.setContent(
      `QUEUE : ${this.screen.page.renderQueue.length} | MOUSE : ${this.screen.mouse.x} ${this.screen.mouse.y} ${this.screen.mouse.down ? "DOWN" : "UP"}`
    );
    while (this.index < this.content.length) {
      this.renderLetter(screen);
      this.index++;
    }
    this.lastSize = this.content.length;
    this.reset();
  }
}
