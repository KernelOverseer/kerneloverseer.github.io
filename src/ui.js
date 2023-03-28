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

  render(screen) { }

  handleEvents(screen) {
    this.isMouseOver(screen);
    this.isMouseCLicked(screen);
  }

  isMouseCLicked(screen) {
    if (this.hovered && screen.mouse.down) {
      this.clicked = true;
      if (typeof this.onMouseClick === "function" && !this.onMouseClickCalled) {
        this.onMouseClick();
        this.onMouseClickCalled = true;
      }
    } else {
      this.onMouseClickCalled = false;
      this.clicked = false;
    }
  }

  isMouseOver(screen) {
    if (
      screen.mouse.x >= this.x &&
      screen.mouse.x < this.x + this.width &&
      screen.mouse.y >= this.y &&
      screen.mouse.y < this.y + this.height
    ) {
      this.hovered = true;
      if (typeof this.onMouseOver === "function") {
        this.onMouseOver();
        this.onMouseOverCalled = true;
      }
    } else {
      this.hovered = false;
    }
    return this.hovered;
  }
}

class Button extends UIComponent {
  constructor(x, y, width, height, text = "click", callBack, extendedOptions) {
    super(x, y, width, height);
    this.extendedOptions = {
      disabled: false,
      ...extendedOptions,
    };
    this.callBack = callBack;
    this.text = new Text(text, x, y, 0, { animate: 1, rerender: true });
    this.centerText();
    this.onMouseClick = callBack;
    this.lastState;

    //colors
    this.idleColor = Colors.getColor("#fffd85");
    this.hoverColor = Colors.getColor("#92763e");
    this.clickColor = Colors.getColor("#9f8646");
    this.disabledColor = Colors.getColor("#cdcdcd");
  }

  render(screen) {
    this.handleEvents(screen);
    if (this.extendedOptions.disabled) {
      this.renderDisabledBackground(screen);
      this.lastState = "disabled";
    }
    else {
      if (this.clicked && this.lastState != "clicked") {
        this.renderClickedBackground(screen);
        this.lastState = "clicked";
      } else if (this.hovered && this.lastState != "hovered") {
        this.renderHoveredBackground(screen);
        this.lastState = "hovered";
      } else if (!this.clicked && !this.hovered && this.lastState != "idle") {
        this.renderBackground(screen);
        this.lastState = "idle";
      }
    }
    this.text.render(screen);
  }

  renderDisabledBackground(screen) {
    this.renderBackground(screen, this.disabledColor);
  }

  renderHoveredBackground(screen) {
    this.renderBackground(screen, this.hoverColor);
  }

  renderClickedBackground(screen) {
    this.renderBackground(screen, this.clickColor);
  }

  renderBackground(screen, color = this.idleColor) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        screen.putPixel(this.x + j, this.y + i, color);
      }
    }
  }

  centerText() {
    let x = this.x + Math.round(this.width / 2 - this.text.width / 2);
    let y = this.y + Math.round(this.height / 2 - this.text.height / 2);
    this.text.x = x;
    this.text.y = y;
  }
}

class Selector extends UIComponent {
  constructor(
    x,
    y,
    width,
    height,
    options = ["a", "b", "c"],
    callBack,
    extendedOptions
  ) {
    super(x, y, width, height);
    this.callBack = callBack;
    this.options = options;
    this.extendedOptions = {
      default: 0,
      ...extendedOptions,
    };
    this.optionIndex = this.extendedOptions.default;
    this.less = new Button(x, y, 10, height, "<", this.lessPressed.bind(this));
    this.more = new Button(
      x + width - 10,
      y,
      10,
      height,
      ">",
      this.morePressed.bind(this)
    );
    this.text = new Text(this.options[this.optionIndex], x, y, "#ffffff", {
      animate: 0,
      rerender: true,
    });
    this.centerText();
  }

  lessPressed() {
    if (this.optionIndex > 0) {
      this.optionIndex--;
      this.optionChanged();
    }
  }

  morePressed() {
    this.optionIndex++;
    if (this.optionIndex >= this.options.length) {
      this.optionIndex = this.options.length - 1;
    }
    else {
      this.optionChanged();
    }
  }

  optionChanged() {
    if (typeof this.callBack === "function") {
      this.callBack(this.options[this.optionIndex]);
    }
    this.text.setContent(this.options[this.optionIndex]);
    this.centerText();
  }

  render(screen) {
    this.clear(screen);
    this.less.extendedOptions.disabled = (this.optionIndex == 0);
    this.more.extendedOptions.disabled = (this.optionIndex == this.options.length - 1);

    this.less.render(screen);
    this.more.render(screen);
    this.text.render(screen);
  }

  centerText() {
    let x = this.x + Math.round(this.width / 2 - this.text.width / 2);
    let y = this.y + Math.round(this.height / 2 - this.text.height / 2);
    this.text.x = x;
    this.text.y = y;
  }

  clear(screen) {
    screen.clear(this.x + 10, this.y, this.width - 20, this.height);
  }
}
