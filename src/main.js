const DEBUG = false;

function bootSequence(pixScreen, pageRouter) {
    bootPage = new Page("boot");
    bootPage.pushComponent(new DebugBar(pixScreen));
    bootPage.pushComponent(
        new Text(
            "Initializing render queue" +
            "\n\nLoading colors" +
            "\n\nLoading FONT" +
            "\n\nLoading Event Handlers" +
            "\n\nLoading UI Components" +
            "\n\nLoading BOOT Logo",
            0,
            0
        )
    );
    bootPage.pushComponent(
        new Text(
            "                          [OK]" +
            "\n\n               [OK]" +
            "\n\n             [OK]" +
            "\n\n                       [OK]" +
            "\n\n                      [OK]" +
            "\n\n                  [OK]",
            0,
            0,
            250,
            {
                onFinish: () => {
                    bootPage.pushComponent(new Button(275, 300, 50, 25, "ENTER", () => {
                        pageRouter.navigate('ui');
                    }
                    ))
                }
            }
        )
    );
    let art =
        "      :::    ::: :::::::::: :::::::::  ::::    ::: :::::::::: :::                            \n     :+:   :+:  :+:        :+:    :+: :+:+:   :+: :+:        :+:                             \n    +:+  +:+   +:+        +:+    +:+ :+:+:+  +:+ +:+        +:+                              \n   +#++:++    +#++:++#   +#++:++#:  +#+ +:+ +#+ +#++:++#   +#+                               \n  +#+  +#+   +#+        +#+    +#+ +#+  +#+#+# +#+        +#+                                \n #+#   #+#  #+#        #+#    #+# #+#   #+#+# #+#        #+#                                 \n###    ### ########## ###    ### ###    #### ########## ##########                           ";
    let art2 =
        "      ::::::::  :::     ::: :::::::::: :::::::::   ::::::::  :::::::::: :::::::::: ::::::::: \n    :+:    :+: :+:     :+: :+:        :+:    :+: :+:    :+: :+:        :+:        :+:    :+: \n   +:+    +:+ +:+     +:+ +:+        +:+    +:+ +:+        +:+        +:+        +:+    +:+  \n  +#+    +:+ +#+     +:+ +#++:++#   +#++:++#:  +#++:++#++ +#++:++#   +#++:++#   +#++:++#:    \n +#+    +#+  +#+   +#+  +#+        +#+    +#+        +#+ +#+        +#+        +#+    +#+    \n#+#    #+#   #+#+#+#   #+#        #+#    #+# #+#    #+# #+#        #+#        #+#    #+#     \n########      ###     ########## ###    ###  ########  ########## ########## ###    ###      ";
    bootPage.pushComponent(new Text(art, 50, pixScreen.height / 4, 255, { animate: 10 }));
    bootPage.pushComponent(
        new Text(art2, 50, pixScreen.height / 4 + 6 * 14, 255, { animate: 10 })
    );
    return bootPage;
}

function uiTestingPage(pixScreen, pageRouter) {
    let testingPage = new Page("ui");
    testingPage.pushComponent(
        new Button(275, 200, 50, 25, "TEST")
    );
    testingPage.pushComponent(new DebugBar(pixScreen));
    return testingPage;
}

var pixScreen;
function mainContent() {
    pixScreen = new PixScreen(1200, 800);
    let pageRouter = new PageRouter(pixScreen);
    document.getElementById("root").appendChild(pixScreen.dom);

    let bootPage = bootSequence(pixScreen, pageRouter);
    let testingPage = uiTestingPage(pixScreen, pageRouter);

    pageRouter.addPage(bootPage);
    pageRouter.addPage(testingPage);

    pageRouter.navigate("boot");

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

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function draw() {
        background(255);
        if (pixScreen.image) {
            for (let i = 0; i < pixScreen.height; i++) {
                for (let j = 0; j < pixScreen.width; j++) {
                    index = 4 * (j + i * pixScreen.width);
                    colors = hexToRgb(PALETTE[pixScreen.image[i][j]])
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
