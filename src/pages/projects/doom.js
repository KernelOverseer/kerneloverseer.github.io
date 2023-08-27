function doomPageIntro(pixScreen, pageRouter) {
  let page = new Page("projects/doom", doomPageIntro);

  page.pushComponent(new DebugBar(pixScreen));
  page.pushComponent(new Button(20, 20, 50, 15, "<- back", () => {
    pageRouter.back();
  })
  );
  page.pushComponent(new Button(530, 20, 50, 15, "next ->", () => {
    pageRouter.navigate('projects/doomEditor');
  })
  );
  page.pushComponent(new Button(200, 45, 200, 15, "Check it on Github", () => {
    window.open("https://github.com/kerneloverseer/KSICARDOOM", "_blank");
  })
  );
  page.pushComponent(new Text("PROJECTS - KSICARDOOM", 237, 25, "#ffffff"));
  page.pushComponent(new Text(`KSICARDOOM is an advanced ray-casting game\n\nwritten from scratch in C, with an engine that supports :\n
  • Multiple sectors with different floor and ceiling heights.\n
  • Wall, floor and ceiling textures.\n
  • Fixed, animated, 360° sprites.\n
  • 3D camera movements, jumping and crouching.\n
  • Projectiles, collectibles, and events.\n
  • Loadable map files.\n
  • Simple multiplayer using UNIX sockets.\n
  • Background and event triggered sounds.\n
  • Modular design, and ready interface for implementing bots.
  `, 50, 100, "#ffffff"));
  page.pushComponent(new NativeImage("https://camo.githubusercontent.com/c9f7bfc84dee897513750492ebe6330764d99374d929f7ac78b57d57df0e35ec/68747470733a2f2f6b65726e656c6f766572736565722e6769746875622e696f2f7374617469632f6b7369636172646f6f6d5f7374616972732e676966", 60, 240, 200, 133));
  page.pushComponent(new NativeImage("https://camo.githubusercontent.com/a950accfd35f0501303a734d535afedf22a5511f913d7d2c2a6974784722a86f/68747470733a2f2f6b65726e656c6f766572736565722e6769746875622e696f2f7374617469632f6b7369636172646f6f6d5f6e6f6e5f6575636c696465616e2e676966", 330, 240, 200, 133));


  return page;
}

function doomPageEditor(pixScreen, pageRouter) {
  let page = new Page("projects/doomEditor", doomPageEditor);

  page.pushComponent(new DebugBar(pixScreen));
  page.pushComponent(new Button(20, 20, 50, 15, "<- back", () => {
    pageRouter.back();
  })
  );
  page.pushComponent(new Button(530, 20, 50, 15, "next ->", () => {
    pageRouter.navigate('projects/doom1');
  })
  );
  page.pushComponent(new Button(200, 45, 200, 15, "Check it on Github", () => {
    window.open("https://github.com/kerneloverseer/KSICARDOOM", "_blank");
  })
  );
  page.pushComponent(new Text("PROJECTS - KSICARDOOM", 237, 25, "#ffffff"));
  page.pushComponent(new Text(`The map editor is using a GUI library build from scratch, on top of SDL2, that supports :\n\n
  • Buttons\n
  • Check-boxes\n
  • Sliders\n
  • Tabs\n
  • Lists\n
  • Canvas\n\n
The editor can either create a new map, or edit an existing ones,\n\nthe map format is a special KSICARDOOM file,\n\ncontaining assets, map layout and sprite positions.`, 50, 100, "#ffffff"));
  page.pushComponent(new NativeImage("https://camo.githubusercontent.com/2b5fc0894afee8fbf4d1fa9e85b7fa77a2dccb5b1076643ff07c2f1f80082b5a/68747470733a2f2f6b65726e656c6f766572736565722e6769746875622e696f2f7374617469632f6b7369636172646f6f6d5f656469746f725f77616c6c732e676966", 60, 240, 200, 133));
  page.pushComponent(new NativeImage("https://camo.githubusercontent.com/d26cf4a1baf027820a888bada1b4dac9ee9266e01995ed8ecbb59790a548705e/68747470733a2f2f6b65726e656c6f766572736565722e6769746875622e696f2f7374617469632f6b7369636172646f6f6d5f656469746f725f666c6f6f725f6365696c696e672e676966", 330, 240, 200, 133));


  return page;
}

function doomPage(pixScreen, pageRouter) {
  let page = new Page("projects/doom1", doomPage);

  page.pushComponent(new DebugBar(pixScreen));
  page.pushComponent(new Button(20, 20, 50, 15, "<- back", () => {
    pageRouter.back();
  })
  );
  page.pushComponent(new Button(530, 20, 50, 15, "next ->", () => {
    pageRouter.navigate('projects/doom2');
  })
  );
  page.pushComponent(new Button(200, 45, 200, 15, "Check it on Github", () => {
    window.open("https://github.com/kerneloverseer/KSICARDOOM", "_blank");
  })
  );
  page.pushComponent(new Text("Raycasting demonstration", 228, 25, "#ffffff"));
  page.pushComponent(new IframeEmbed("https://editor.p5js.org/KernelOverseer/full/Ilst053ZC", 50, 70, 500, 300));


  return page;
}

function doomPage2(pixScreen, pageRouter) {
  let page = new Page("projects/doom2", doomPage2);

  page.pushComponent(new DebugBar(pixScreen));
  page.pushComponent(new Button(20, 20, 50, 15, "<- back", () => {
    pageRouter.back();
  })
  );
  page.pushComponent(new Button(530, 20, 50, 15, "next ->", () => {
    pageRouter.navigate('projects/doomYoutube');
  })
  );
  page.pushComponent(new Button(200, 45, 200, 15, "Check it on Github", () => {
    window.open("https://github.com/kerneloverseer/KSICARDOOM", "_blank");
  })
  );
  page.pushComponent(new Text("Raycasting texturing demonstration", 198, 25, "#ffffff"));
  page.pushComponent(new IframeEmbed("https://editor.p5js.org/KernelOverseer/full/SQAqsHP6A", 50, 70, 500, 300));

  return page;
}

function doomYoutubeVideo(pixScreen, pageRouter) {
  let page = new Page("projects/doomYoutube", doomYoutubeVideo);

  page.pushComponent(new DebugBar(pixScreen));
  page.pushComponent(new Button(20, 20, 50, 15, "<- back", () => {
    pageRouter.back();
  })
  );
  page.pushComponent(new Button(500, 20, 80, 15, "Projects ->", () => {
    pageRouter.navigate('projects');
  })
  );
  page.pushComponent(new Button(200, 45, 200, 15, "Check it on Github", () => {
    window.open("https://github.com/kerneloverseer/KSICARDOOM", "_blank");
  })
  );
  page.pushComponent(new Text("Youtube tutorial", 253, 25, "#ffffff"));
  page.pushComponent(new IframeEmbed("https://www.youtube.com/embed/DFZnzCbmlng", 50, 70, 500, 300));
  return page;
}