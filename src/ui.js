class Button extends Component {
  constructor(x, y, width, height, text = "click", callBack, color = 255) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.callBack = callBack;
    this.text = new Text(text, x, y, 0, 0);
    this.centerText();
  }

  render(screen) {
    this.text.reset();
    if (
      screen.mouse.x >= this.x &&
      screen.mouse.x < this.x + this.width &&
      screen.mouse.y >= this.y &&
      screen.mouse.y < this.y + this.height
    ) {
      this.renderHoveredBackground(screen);
    } else {
      this.renderBackground(screen);
    }
    this.text.render(screen);
  }

  renderBackground(screen) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        screen.putPixel(this.x + j, this.y + i, this.color);
      }
    }
  }

  renderHoveredBackground(screen) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        screen.putPixel(this.x + j, this.y + i, 2);
      }
    }
  }

  onMouseOver() {}

  centerText() {
    let x =
      this.x + Math.floor(this.width / 2) - Math.floor(this.text.width / 2);
    let y =
      this.y + Math.floor(this.height / 2) - Math.floor(this.text.height / 2);
    this.text.x = x;
    this.text.y = y;
  }
}
