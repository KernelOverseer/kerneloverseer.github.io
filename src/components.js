class Component {
  constructor() {
    this.ended = false;
  }

  render(screen) { }

  destroy() { }
}

var colorCache = {};

class Colors {
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

  static rgb2lab({ r, g, b }) {
    var x, y, z;
    r /= 255;
    g /= 255;
    b /= 255;

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    return {
      l: 116 * y - 16,
      a: 500 * (x - y),
      b: 200 * (y - z),
    };
  }

  static getColorDistance(color1, color2) {
    return (
      Math.pow(color1.l - color2.l, 2) +
      Math.pow(color1.a - color2.a, 2) +
      Math.pow(color1.b - color1.b, 2)
    );
  }

  static getColor(hex) {
    // Check if only one color is given
    if (typeof hex == "string") {
      try {
        return Colors.getNearestColor(Colors.hexToRgb(hex));
      } catch (err) {
        return 0;
      }
    }
    return hex;
  }

  static cacheColor(r, g, b) {
    let colorString = `${r}.${g}.${b}`
    let nearest = 0;
    let nearestDistance = Infinity;
    for (let i = 0; i < PALETTE.length; i++) {
      let color = Colors.hexToRgb(PALETTE[i]);
      let distance = Colors.getColorDistance(
        Colors.rgb2lab({ r: r, g: g, b: b }),
        Colors.rgb2lab(color)
      );
      if (distance < nearestDistance) {
        nearest = i;
        nearestDistance = distance;
      }
    }
    colorCache[colorString] = nearest;
    return nearest;
  }

  static cachedColor(r, g, b) {
    let colorString = `${r}.${g}.${b}`
    if (colorCache[colorString] !== undefined)
      return colorCache[colorString]
    return Colors.cacheColor(r, g, b)
  }

  static getNearestColor({ r, g, b }) {
    return Colors.cachedColor(r, g, b);
  }

  static switchPalette(name) {
    let entry = PALETTES[name];
    if (entry !== undefined) {
      PALETTE = entry;
    }
  }
}

class Text extends Component {
  constructor(content, x, y, color = "#FFFFFF", options) {
    super();
    this.setContent(content);
    this.x = x;
    this.y = y;
    this.currX = x;
    this.currY = y;
    this.color = Colors.getColor(color);
    this.index = 0;
    this.lastIndex = 0;
    this.options = {
      animate: 1,
      lineBreak: true,
      onFinish: null,
      rerender: false,
      ...options,
    };
  }

  setContent(content) {
    this.content = content;
    if (typeof this.content == "string") {
      this.content = this.content.toUpperCase();
    } else {
      this.content = `${this.content}`.toUpperCase();
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
          if (this.options.lineBreak && this.currX >= screen.width)
            this.newLine();
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
    if (this.options.rerender) this.renderLoop(screen);
    else this.renderOnce(screen);
    if (this.index >= this.content.length && !this.options.rerender) {
      this.ended = true;
      if (typeof this.options.onFinish === "function") {
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
  constructor(url, x, y) {
    super();
    this.x = x;
    this.y = y;
    this.url = url;
    this.loaded = false;
    this.row = 0;
    this.loadImage(url);
  }

  render(screen) {
    let rows = 0;
    if (this.loaded) {
      while (rows < 5 && this.row < this.height) {
        let i = this.row;
        for (let j = 0; j < this.width; j++) {
          screen.putPixel(this.x + j, this.y + i, this.pixels[i][j]);
        }
        this.row++
        rows++;
      }
      if (this.row >= this.height)
        this.ended = true;
    }
  }

  createPixels(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.pixels[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        this.pixels[i][j] = 0;
      }
    }
  }

  loadImage(url) {
    this.img = new window.Image();
    this.img.src = url;
    this.img.onload = () => {
      this.imageLoaded();
    };
  }

  loadRow(pixels, i) {
    for (let j = 0; j < this.width; j++) {
      let index = j * 4 + i * this.width * 4;
      try {
        this.pixels[i][j] = Colors.getNearestColor({
          r: pixels[index],
          g: pixels[index + 1],
          b: pixels[index + 2],
        });
      } catch (err) { }
    }
  }

  imageLoaded() {
    try {
      this.width = this.img.width;
      this.height = this.img.height;
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = this.img.width;
      canvas.height = this.img.height;
      context.drawImage(this.img, 0, 0, this.img.width, this.img.height);
      this.createPixels(this.img.width, this.img.height);
      let pixels = context.getImageData(0, 0, this.width, this.height).data;
      for (let i = 0; i < this.height; i++) {
        this.loadRow(pixels, i);
      }
      canvas.remove();
      this.loaded = true;
    } catch (err) {
      if (!once) {
        console.log("err", err);
      }
      once = 1;
    }
  }

  getGrayscaleFromRGB(r, g, b) {
    return Math.floor((r + g + b) / 3);
  }

  static preload(images) {
    let loadedCount = 0;
    let imageComponents = []
    images.forEach((url) => {
      let image = new window.Image();
      image.src = url;
      image.onload = () => {
        loadedCount++;
      }
      imageComponents.push(imageComponents);
    });
  }
}

class IframeEmbed extends Component {
  constructor(url, x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.url = url;
    this.loaded = false;
    this.displayed = false;
    this.loadIframe(url);
  }

  loadIframe(url) {
    this.iframe = document.createElement("iframe");
    this.iframe.setAttribute("src", url);
    this.iframe.setAttribute("scrolling", "no");
    // avoid iframe to steal mouse events
    this.iframe.onload = () => {
      console.log("IFRAME ONLOAD");
      this.iframe.style.pointerEvents = "auto";
    }
    console.log("IFRAME POINTER NONE");
    this.iframe.style.pointerEvents = "none";
  }

  render(screen) {
    if (!this.displayed) {
      this.iframe.style.position = "absolute";
      this.iframe.style.top = `${this.y * ScreenConfig.pixelSize}px`;
      this.iframe.style.left = `${this.x * ScreenConfig.pixelSize}px`;
      this.iframe.style.width = `${this.width * ScreenConfig.pixelSize}px`;
      this.iframe.style.height = `${this.height * ScreenConfig.pixelSize}px`;
      this.iframe.style.userSelect = 'none';
      screen.dom.appendChild(this.iframe);
      this.displayed = true;
    }
  }

  destroy() {
    console.log("IFRAME REMOVED");
    this.iframe.remove();
  }
}

class NativeImage extends Component {
  constructor(url, x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.url = url;
    this.loaded = false;
    this.displayed = false;
    this.loadImage(url);
  }

  loadImage(url) {
    this.img = new window.Image();
    this.img.src = url;
    this.img.onload = () => {
      this.loaded = true;
    };
  }

  render(screen) {
    if (this.loaded && !this.displayed) {
      this.img.style.position = "absolute";
      this.img.style.top = `${this.y * ScreenConfig.pixelSize}px`;
      this.img.style.left = `${this.x * ScreenConfig.pixelSize}px`;
      this.img.style.width = `${this.width * ScreenConfig.pixelSize}px`;
      this.img.style.height = `${this.height * ScreenConfig.pixelSize}px`;
      this.img.style.userSelect = 'none';
      screen.dom.appendChild(this.img);
      this.displayed = true;
    }
  }

  destroy() {
    console.log("IMAGE REMOVED");
    this.img.remove();
  }
}

var once = 0;
