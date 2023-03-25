class Component {
  constructor() {
    this.ended = false;
  }

  render(screen) { }
}

class Text extends Component {
  constructor(content, x, y, color = 255, options) {
    super();
    this.setContent(content);
    this.x = x;
    this.y = y;
    this.currX = x;
    this.currY = y;
    this.color = color;
    this.index = 0;
    this.lastIndex = 0;
    this.options = { animate: 1, lineBreak: true, onFinish: null, rerender: false, ...options }
  }

  setContent(content) {
    this.content = content;
    if (typeof (this.content) == "string") {
      this.content = this.content.toUpperCase();
    }
  }

  newLine() {
    this.currX = this.x;
    this.currY += 6;
  }

  renderLetter(screen) {
    let letter = FONT[this.content[this.index]];
    if (letter != undefined) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.options.lineBreak && this.currX >= screen.width) this.newLine();
          if (letter[i][j])
            screen.putPixel(
              this.currX + j,
              this.currY + i,
              letter[i][j] * this.color
            );
        }
      }
      this.currX += 6;
    } else if (this.content[this.index] == "\n") {
      this.newLine();
    }
  }

  render(screen) {
    if (this.options.rerender)
      this.renderLoop(screen);
    else
      this.renderOnce(screen);
    if (this.index >= this.content.length && !this.options.rerender) {
      this.ended = true;
      if (typeof this.options.onFinish === 'function') {
        this.options.onFinish();
      }
    }
  }

  renderOnce(screen) {
    let i = 0;
    while (this.index < this.content.length) {
      this.renderLetter(screen);
      this.index++;
      i++;
      if (this.options.animate != 0 && i > this.options.animate) break;
    }
  }

  renderLoop(screen) {
    let i = 0;
    this.resetLoop();
    while (this.index < this.content.length) {
      this.renderLetter(screen);
      this.index++;
      if (this.index >= this.lastIndex) {
        this.lastIndex = this.index;
        i++;
      }
      if (this.options.animate != 0 && i > this.options.animate) break;
    }
  }

  reset() {
    this.currX = this.x;
    this.currY = this.y;
    this.index = 0;
    this.lastIndex = 0;
  }

  resetLoop() {
    this.currX = this.x;
    this.currY = this.y;
    this.index = 0;
  }

  get width() {
    return this.content.length * 6;
  }

  get height() {
    return 6;
  }
}

class Image extends Component {
  constructor(content, x, y) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.height = content.length;
    this.width = content[0]?.length;
  }

  render(screen) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        screen.putPixel(this.x + j, this.y + i, this.content[i][j]);
      }
    }
  }
}
