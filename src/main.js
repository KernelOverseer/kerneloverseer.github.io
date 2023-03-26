const DEBUG = false;

var pixScreen;

function mainContent() {
  pixScreen = new PixScreen(1200, 800);
  // pixScreen = new CanvasScreen(1220, 800);
  let pageRouter = new PageRouter(pixScreen);
  document.getElementById("root").appendChild(pixScreen.dom);

  let pageFunctions = [bootSequencePage, uiTestingPage, introPage];

  pageFunctions.forEach((pageFunction) => {
    let page = pageFunction(pixScreen, pageRouter);
    pageRouter.addPage(page);
  });

  pageRouter.navigate("boot");
  pixScreen.render(); // render loop
}

// DEBUG USING P5JS instead of the custom "pixel screen" XD

if (DEBUG) {
  var img;
  function setup() {
    canvas = createCanvas(pixScreen.width + 2, pixScreen.height + 2);
    canvas.position(
      window.innerWidth / 2 - pixScreen.width / 2,
      window.innerHeight - pixScreen.height
    );
    canvas.class("canvas_container");
    img = createImage(pixScreen.width, pixScreen.height);
    img.loadPixels();
  }

  var test = 0;

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function draw() {
    background(255);
    if (pixScreen.image) {
      for (let i = 0; i < pixScreen.height; i++) {
        for (let j = 0; j < pixScreen.width; j++) {
          index = 4 * (j + i * pixScreen.width);
          colors = hexToRgb(PALETTE[pixScreen.image[i][j]]);
          img.pixels[index] = colors?.r;
          img.pixels[index + 1] = colors?.g;
          img.pixels[index + 2] = colors?.b;
          img.pixels[index + 3] = 255;
        }
      }
    }
    img.updatePixels();
    image(img, 1, 1);
  }
}
