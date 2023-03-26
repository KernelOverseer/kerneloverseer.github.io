function bootSequencePage(pixScreen, pageRouter) {
  let bootPage = new Page("boot");
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
      0,
      "#ffffff"
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
      "#00ff00",
      {
        onFinish: () => {
          bootPage.pushComponent(
            new Button(250, 300, 100, 25, "   PROCEDE   ", () => {
              pageRouter.navigate("intro");
            })
          );
        },
      }
    )
  );
  let art =
    "      :::    ::: :::::::::: :::::::::  ::::    ::: :::::::::: :::                            \n     :+:   :+:  :+:        :+:    :+: :+:+:   :+: :+:        :+:                             \n    +:+  +:+   +:+        +:+    +:+ :+:+:+  +:+ +:+        +:+                              \n   +#++:++    +#++:++#   +#++:++#:  +#+ +:+ +#+ +#++:++#   +#+                               \n  +#+  +#+   +#+        +#+    +#+ +#+  +#+#+# +#+        +#+                                \n #+#   #+#  #+#        #+#    #+# #+#   #+#+# #+#        #+#                                 \n###    ### ########## ###    ### ###    #### ########## ##########                           ";
  let art2 =
    "      ::::::::  :::     ::: :::::::::: :::::::::   ::::::::  :::::::::: :::::::::: ::::::::: \n    :+:    :+: :+:     :+: :+:        :+:    :+: :+:    :+: :+:        :+:        :+:    :+: \n   +:+    +:+ +:+     +:+ +:+        +:+    +:+ +:+        +:+        +:+        +:+    +:+  \n  +#+    +:+ +#+     +:+ +#++:++#   +#++:++#:  +#++:++#++ +#++:++#   +#++:++#   +#++:++#:    \n +#+    +#+  +#+   +#+  +#+        +#+    +#+        +#+ +#+        +#+        +#+    +#+    \n#+#    #+#   #+#+#+#   #+#        #+#    #+# #+#    #+# #+#        #+#        #+#    #+#     \n########      ###     ########## ###    ###  ########  ########## ########## ###    ###      ";
  bootPage.pushComponent(
    new Text(art, 25, pixScreen.height / 4 + 6 * 6, "#ffffff", { animate: 10 })
  );
  bootPage.pushComponent(
    new Text(art2, 25, pixScreen.height / 4 + 6 * 14, "#ffffff", {
      animate: 10,
    })
  );

  let currentPalette = window.localStorage.getItem("palette");
  currentPalette = Object.keys(PALETTES).indexOf(currentPalette);
  if (currentPalette == -1) currentPalette = 1;
  bootPage.pushComponent(
    new Text("PALETTE", pixScreen.width - 71, 0, "#ffffff")
  );
  bootPage.pushComponent(
    new Selector(
      pixScreen.width - 100,
      6,
      100,
      10,
      Object.keys(PALETTES),
      (value) => {
        window.localStorage.setItem("palette", value);
      },
      { default: currentPalette }
    )
  );
  bootPage.pushComponent(
    new Button(pixScreen.width - 100, 18, 100, 10, "   APPLY   ", () => {
      window.location.reload();
    })
  );
  return bootPage;
}
