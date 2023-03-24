async function bootSequence(pixScreen) {
    pixScreen.pushComponent(new RenderQueueIndicator(pixScreen));
    pixScreen.pushComponent(new Text("0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ.,!?;:$#'\"/%&()@+-=[]{}<>", 0, 0));
    let art = "      :::    ::: :::::::::: :::::::::  ::::    ::: :::::::::: :::                            \n     :+:   :+:  :+:        :+:    :+: :+:+:   :+: :+:        :+:                             \n    +:+  +:+   +:+        +:+    +:+ :+:+:+  +:+ +:+        +:+                              \n   +#++:++    +#++:++#   +#++:++#:  +#+ +:+ +#+ +#++:++#   +#+                               \n  +#+  +#+   +#+        +#+    +#+ +#+  +#+#+# +#+        +#+                                \n #+#   #+#  #+#        #+#    #+# #+#   #+#+# #+#        #+#                                 \n###    ### ########## ###    ### ###    #### ########## ##########                           ";
    let art2 = "      ::::::::  :::     ::: :::::::::: :::::::::   ::::::::  :::::::::: :::::::::: ::::::::: \n    :+:    :+: :+:     :+: :+:        :+:    :+: :+:    :+: :+:        :+:        :+:    :+: \n   +:+    +:+ +:+     +:+ +:+        +:+    +:+ +:+        +:+        +:+        +:+    +:+  \n  +#+    +:+ +#+     +:+ +#++:++#   +#++:++#:  +#++:++#++ +#++:++#   +#++:++#   +#++:++#:    \n +#+    +#+  +#+   +#+  +#+        +#+    +#+        +#+ +#+        +#+        +#+    +#+    \n#+#    #+#   #+#+#+#   #+#        #+#    #+# #+#    #+# #+#        #+#        #+#    #+#     \n########      ###     ########## ###    ###  ########  ########## ########## ###    ###      ";
    pixScreen.pushComponent(new Text(art, 50, pixScreen.height / 4, 255, 5));
    pixScreen.pushComponent(new Text(art2, 50, pixScreen.height / 4 + 6 * 14, 255, 5));
    for (let i = 0; i < 256; i++) {
        pixScreen.pushComponent(new Text(["BLK"], (i * 5) % pixScreen.width, 6 + 5 * (Math.floor((i * 5) / pixScreen.width)), i));
        await sleep(1);
    }
}

function mainContent() {
    let pixScreen = new PixScreen(1200, 800);
    document.getElementById('root').appendChild(pixScreen.dom);
    pixScreen.render();
    bootSequence(pixScreen);
    // async function testText() {
    //     for (let i = 0; i < 1; i++) {
    //         pixScreen.pushComponent(new Text("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?;", i * 50, i * 6));
    //         await sleep(500);
    //     }
    // }

    // testText();
}
