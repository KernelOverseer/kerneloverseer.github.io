class ScreenConfig {
  static pixelSize = 2;
  static frameSleep = 1;
  static hardRefresh = true;
}

class Pixel {
  constructor(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }

  get visible() {
    return this.dom !== undefined;
  }

  show(color = 255) {
    if (!this.visible) {
      let element = document.createElement("div");
      element.style.width = `${ScreenConfig.pixelSize}px`;
      element.style.height = `${ScreenConfig.pixelSize}px`;
      element.style.backgroundColor = PALETTE[color % PALETTE.length];
      element.style.position = "absolute";
      element.style.top = `${this.y * ScreenConfig.pixelSize}px`;
      element.style.left = `${this.x * ScreenConfig.pixelSize}px`;
      this.parent.appendChild(element);
      this.dom = element;
    } else if (this.color != color) {
      this.dom.style.backgroundColor = PALETTE[color % PALETTE.length];
    }
    this.color = color;
  }

  hide() {
    if (this.visible) this.dom.remove();
    this.dom = undefined;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class MouseEvents {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.click = false;
  }
}

class PixScreen {
  constructor(width, height) {
    this.screenWidth = width;
    this.screenHeight = height;
    this.height = Math.floor(height / ScreenConfig.pixelSize);
    this.width = Math.floor(width / ScreenConfig.pixelSize);
    this.createContainer();
    this.image = this.makeImage();
    this.pixels = this.makePixels();
    this.renderQueue = [];
    this.change = false;

    this.mouse = new MouseEvents();
    this.handleMouse();
  }

  createContainer() {
    this.dom = document.createElement("div");
    this.dom.style.height = `${this.screenHeight}px`;
    this.dom.style.width = `${this.screenWidth}px`;
    this.dom.style.position = "absolute";
    this.dom.style.left = `calc(50% - ${Math.floor(this.screenWidth / 2)}px)`;
    this.dom.style.backgroundRepeat = "repeat";
    this.dom.style.backgroundSize = `${ScreenConfig.pixelSize}px`;
    this.dom.style.backgroundColor = "black";
    this.dom.style.backgroundImage = "url('assets/bg-pixel.svg')";
  }

  async render() {
    while (true) {
      let newRenderQueue = [];
      if (ScreenConfig.hardRefresh) this.clear();
      this.renderQueue.forEach((component) => {
        component.render(this);
        if (!component.ended) newRenderQueue.push(component);
      });
      this.renderQueue = newRenderQueue;
      this.updatePixels();
      if (ScreenConfig.frameSleep > 0) await sleep(ScreenConfig.frameSleep);
      this.mouse.click = false;
    }
  }

  updatePixels() {
    if (this.change) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (this.image[y][x]) {
            this.pixels[y][x].show(this.image[y][x]);
          } else {
            this.pixels[y][x].hide();
          }
        }
        this.change = false;
      }
    }
  }

  makeImage() {
    const twoDArray = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      twoDArray[i] = new Array(this.width);
    }
    return twoDArray;
  }

  makePixels() {
    const twoDArray = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      twoDArray[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        twoDArray[i][j] = new Pixel(j, i, this.dom);
      }
    }
    return twoDArray;
  }

  putPixel(x, y, color) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    if (this.image[y][x] != color) {
      this.image[y][x] = color;
      this.change = true;
    }
  }

  clear(x = 0, y = 0, width = this.width, height = this.height) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.putPixel(x + j, y + i, 0);
      }
    }
  }

  pushComponent(component) {
    if (component instanceof Component) {
      this.renderQueue.push(component);
    }
  }

  handleMouse() {
    document.addEventListener("mousemove", (event) => {
      let rect = this.dom.getBoundingClientRect();
      this.mouse.x = Math.floor(
        (event.pageX - rect.x) / ScreenConfig.pixelSize
      );
      this.mouse.y = Math.floor(
        (event.pageY - rect.y) / ScreenConfig.pixelSize
      );
    });
    document.addEventListener("click", (event) => {
      this.mouse.click = true;
    });
  }
}
