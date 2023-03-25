class UIComponent extends Component {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // events state
    this.hovered = false;
    this.clicked = false;
    // events
    this.onMouseOver;
    this.onMouseOverCalled = false;
    this.onMouseClick;
    this.onMouseClickCalled = false;
  }

  handleEvents(screen) {
    this.isMouseOver(screen);
    this.isMouseCLicked(screen);
  }

  isMouseCLicked(screen) {
    if (this.hovered && screen.mouse.down) {
      this.clicked = true;
      if (typeof this.onMouseClick === 'function') {
        this.onMouseClick();
        this.onMouseClickCalled = true;
      }
    }
    else {
      this.clicked = false;
    }
  }

  isMouseOver(screen) {
    if (screen.mouse.x >= this.x && screen.mouse.x < this.x + this.width && screen.mouse.y >= this.y && screen.mouse.y < this.y + this.height) {
      this.hovered = true;
      if (typeof this.onMouseOver === 'function') {
        this.onMouseOver();
        this.onMouseOverCalled = true;
      }
    }
    else {
      this.hovered = false;
    }
    return this.hovered;
  }
}

class Button extends UIComponent {
  constructor(x, y, width, height, text = "click", callBack, color = 255) {
    super(x, y, width, height);
    this.color = color;
    this.callBack = callBack;
    this.text = new Text(text, x, y, 0, { animate: 1, rerender: true });
    this.centerText();
    this.onMouseClick = callBack;
  }

  render(screen) {
    this.handleEvents(screen);
    if (this.clicked) {
      this.renderClickedBackground(screen);
    }
    else if (this.hovered) {
      this.renderHoveredBackground(screen);
    } else {
      this.renderBackground(screen);
    }
    // this.text.setContent(status);
    // this.centerText();
    // this.text.reset();
    this.text.render(screen);
  }

  renderHoveredBackground(screen) {
    this.renderBackground(screen, 2)
  }

  renderClickedBackground(screen) {
    this.renderBackground(screen, 3)
  }

  renderBackground(screen, color = this.color) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        screen.putPixel(this.x + j, this.y + i, color);
      }
    }
  }

  centerText() {
    let x =
      this.x + Math.floor(this.width / 2) - Math.floor(this.text.width / 2);
    let y =
      this.y + Math.floor(this.height / 2) - Math.floor(this.text.height / 2);
    this.text.x = x;
    this.text.y = y;
  }
}
