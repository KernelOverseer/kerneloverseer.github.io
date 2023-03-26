class ScreenConfig {
  static pixelSize = 2;
  static frameSleep = 0.1;
  static hardRefresh = false;
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

class Page {
  constructor(path) {
    this.path = path;
    this.change = false; // if there is a change to pixels, screen should be updated
    this.renderQueue = []; // queue containing components to be rendered
    this.rendering = false; // true if in the middle of a render
    this.pendingQueue = []; // components waiting for the frame to finish rendering before pushing to the queue
  }

  pushComponent(component) {
    if (component instanceof Component) {
      if (this.rendering) {
        this.pendingQueue.push(component);
      } else {
        this.renderQueue.push(component);
      }
    }
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

    this.page = new Page();
    this.nextPage; // page to be switched to
    // Events
    this.mouse = new MouseEvents(this);
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
      await sleep(ScreenConfig.frameSleep);
      if (ScreenConfig.hardRefresh) this.clear();
      this.renderComponents();
      this.updatePixels();
      this.mouse.update();
    }
  }

  // need to refactor this function, became complex
  renderComponents() {
    if (this.nextPage) {
      this.page.renderQueue.forEach((component) => {
        component.destroy();
      });
      this.page = this.nextPage; // switching to new page
      this.nextPage = undefined;
      this.clear(); // clearing previous page content on screen
    }
    this.page.rendering = true;
    if (this.page.newRenderQueue !== undefined) {
      // switching render Queue if a new queue exists
      this.page.renderQueue = this.page.newRenderQueue;
      if (!ScreenConfig.hardRefresh) this.clear();
      this.page.newRenderQueue = undefined;
    } else if (this.page.pendingQueue.length > 0) {
      this.page.renderQueue = this.page.renderQueue.concat(
        this.page.pendingQueue
      ); // adding pending components added while in the middle of a render
      this.page.pendingQueue = [];
    }

    let activeComponents = [];
    this.page.renderQueue.forEach((component) => {
      // eliminating components that finished rendering (won't be rendered any further)
      component.render(this);
      if (!component.ended) activeComponents.push(component);
      else component.destroy();
    });

    this.page.renderQueue = activeComponents;
    this.page.rendering = false;
  }

  switchRenderQueue(newRenderQueue) {
    this.page.newRenderQueue = newRenderQueue;
  }

  switchPage(newPage) {
    this.nextPage = newPage;
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
    try {
      if (this.image[y][x] != color) {
        this.image[y][x] = color;
        this.change = true;
      }
    } catch (err) {
      // console.log("error in y", y);
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
    this.page.pushComponent(component);
  }
}

class CanvasScreen {
  constructor(width, height) {
    this.screenWidth = width;
    this.screenHeight = height;
    this.height = Math.floor(height / ScreenConfig.pixelSize);
    this.width = Math.floor(width / ScreenConfig.pixelSize);
    this.createContainer();
    this.image = this.makeImage();
    // this.pixels = this.makePixels();

    this.page = new Page();
    this.nextPage; // page to be switched to
    // Events
    this.mouse = new MouseEvents(this);
  }

  createContainer() {
    this.dom = document.createElement("canvas");
    this.dom.width = this.screenWidth;
    this.dom.height = this.screenHeight;
    this.dom.style.position = "absolute";
    this.dom.style.left = `calc(50% - ${Math.floor(this.screenWidth / 2)}px)`;
    this.context = this.dom.getContext("2d");
    this.imageData = this.context.createImageData(
      this.screenWidth,
      this.screenHeight
    );
  }

  async render() {
    while (true) {
      await sleep(ScreenConfig.frameSleep);
      if (ScreenConfig.hardRefresh) this.clear();
      this.renderComponents();
      this.updatePixels();
      this.mouse.update();
    }
  }

  renderComponents() {
    // need to refactor this function, became complex
    if (this.nextPage) {
      this.page = this.nextPage; // switching to new page
      this.nextPage = undefined;
      this.clear(); // clearing previous page content on screen
    }
    this.page.rendering = true;
    if (this.page.newRenderQueue !== undefined) {
      // switching render Queue if a new queue exists
      this.page.renderQueue = this.page.newRenderQueue;
      if (!ScreenConfig.hardRefresh) this.clear();
      this.page.newRenderQueue = undefined;
    } else if (this.page.pendingQueue.length > 0) {
      this.page.renderQueue = this.page.renderQueue.concat(
        this.page.pendingQueue
      ); // adding pending components added while in the middle of a render
      this.page.pendingQueue = [];
    }

    let activeComponents = [];
    this.page.renderQueue.forEach((component) => {
      // eliminating components that finished rendering (won't be rendered any further)
      component.render(this);
      if (!component.ended) activeComponents.push(component);
    });

    this.page.renderQueue = activeComponents;
    this.page.rendering = false;
  }

  switchRenderQueue(newRenderQueue) {
    this.page.newRenderQueue = newRenderQueue;
  }

  switchPage(newPage) {
    this.nextPage = newPage;
  }

  updatePixels() {
    if (this.change) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          this.setCanvasPixel(x, y);
          // this.context.fillStyle = PALETTE[this.image[y][x]];
          // this.context.fillRect(ScreenConfig.pixelSize * x, ScreenConfig.pixelSize * y, ScreenConfig.pixelSize, ScreenConfig.pixelSize);
        }
        this.change = false;
      }
    }
    this.context.putImageData(this.imageData, 0, 0);
    // console.log(this.imageData);
  }

  static hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  setCanvasPixel(x, y) {
    let i = y,
      j = x;
    x *= ScreenConfig.pixelSize;
    y *= ScreenConfig.pixelSize;
    let color = CanvasScreen.hexToRgb(PALETTE[this.image[i][j] % 256]);
    for (let offY = 0; offY < ScreenConfig.pixelSize; offY++) {
      for (let offX = 0; offX < ScreenConfig.pixelSize; offX++) {
        let index = (x + offX) * 4 + (y + offY) * this.width * 4;
        this.imageData.data[index] = color.r;
        this.imageData.data[index + 1] = color.g;
        this.imageData.data[index + 2] = color.b;
        this.imageData.data[index + 3] = 255;
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

  putPixel(x, y, color) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    try {
      if (this.image[y][x] != color) {
        this.image[y][x] = color;
        this.change = true;
      }
    } catch (err) {
      // console.log("error in y", y);
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
    this.page.pushComponent(component);
  }
}
