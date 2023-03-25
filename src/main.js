const DEBUG = false;

function bootSequence(pixScreen) {
  bootPage = new Page("/");
  bootPage.pushComponent(new DebugBar(pixScreen));
  bootPage.pushComponent(
    new Text(
      "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ.,!?;:$#'\"/%&()@+-=[]{}<>",
      0,
      0
    )
  );
  let art =
    "      :::    ::: :::::::::: :::::::::  ::::    ::: :::::::::: :::                            \n     :+:   :+:  :+:        :+:    :+: :+:+:   :+: :+:        :+:                             \n    +:+  +:+   +:+        +:+    +:+ :+:+:+  +:+ +:+        +:+                              \n   +#++:++    +#++:++#   +#++:++#:  +#+ +:+ +#+ +#++:++#   +#+                               \n  +#+  +#+   +#+        +#+    +#+ +#+  +#+#+# +#+        +#+                                \n #+#   #+#  #+#        #+#    #+# #+#   #+#+# #+#        #+#                                 \n###    ### ########## ###    ### ###    #### ########## ##########                           ";
  let art2 =
    "      ::::::::  :::     ::: :::::::::: :::::::::   ::::::::  :::::::::: :::::::::: ::::::::: \n    :+:    :+: :+:     :+: :+:        :+:    :+: :+:    :+: :+:        :+:        :+:    :+: \n   +:+    +:+ +:+     +:+ +:+        +:+    +:+ +:+        +:+        +:+        +:+    +:+  \n  +#+    +:+ +#+     +:+ +#++:++#   +#++:++#:  +#++:++#++ +#++:++#   +#++:++#   +#++:++#:    \n +#+    +#+  +#+   +#+  +#+        +#+    +#+        +#+ +#+        +#+        +#+    +#+    \n#+#    #+#   #+#+#+#   #+#        #+#    #+# #+#    #+# #+#        #+#        #+#    #+#     \n########      ###     ########## ###    ###  ########  ########## ########## ###    ###      ";
  bootPage.pushComponent(new Text(art, 50, pixScreen.height / 4, 255, 5));
  bootPage.pushComponent(
    new Text(art2, 50, pixScreen.height / 4 + 6 * 14, 255, 5)
  );
  //   bootPage.pushComponent(
  //     new Button(300, 300, 50, 25, "TESTING", () => {
  //       console.log("clicked");
  //     })
  //   );
  return bootPage;
}

function uiTestingPage(pixScreen) {
  let testingPage = new Page("/");
  testingPage.pushComponent(
    new Text(
      "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ.,!?;:$#'\"/%&()@+-=[]{}<>0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ.",
      0,
      0
    )
  );
  testingPage.pushComponent(
    new Button(275, 200, 50, 25, "TESTING", () => {
      console.log("clicked");
    })
  );
  testingPage.pushComponent(new DebugBar(pixScreen));
  return testingPage;
}

var pixScreen;
function mainContent() {
  //   let pixScreen = new PixScreen(1200, 800);
  pixScreen = new PixScreen(1200, 800);
  let pageRouter = new PageRouter(pixScreen);
  document.getElementById("root").appendChild(pixScreen.dom);

  let bootPage = bootSequence(pixScreen);

  //   pageRouter.addPage(bootPage);

  let testingPage = uiTestingPage(pixScreen);
  pageRouter.addPage(testingPage);
  pageRouter.navigate("/");
  pixScreen.render();
}

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

  function draw() {
    background(255);
    if (pixScreen.image) {
      for (let i = 0; i < pixScreen.height; i++) {
        for (let j = 0; j < pixScreen.width; j++) {
          index = 4 * (j + i * pixScreen.width);
          img.pixels[index] = pixScreen.image[i][j];
          img.pixels[index + 1] = pixScreen.image[i][j];
          img.pixels[index + 2] = pixScreen.image[i][j];
          img.pixels[index + 3] = 255;
        }
      }
    }
    img.updatePixels();
    image(img, 1, 1);
  }
}
