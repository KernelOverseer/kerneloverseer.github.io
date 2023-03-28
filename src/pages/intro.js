function introPage(pixScreen, pageRouter) {
  let introPage = new Page("intro");

  let introText =
    "Hello, I am Aymane Biri, a programmer experienced in C/C++/Python development,\n\nI enjoy solving problems, and coming up with brilliant solutions.\n\n\n\n" +
    "• Proficient in C/C++ low level programming and the Unix API (Linux/MacOS).\n\n" +
    "• Highly skilled in Web app development (React, NodeJS, Flask, Django)\n\n" +
    "• Good knowledge in Algorithms and Data Structures.\n\n" +
    "• Good knowledge in Cyber Security, especially web,\n\n  binary exploitation and reverse engineering.\n\n" +
    "• Familiar with Computer Graphics, Linux Kernel Module development,\n\n  network socket programming and real-time multi-threaded C/C++/Python programs.\n\n\n\n" +
    "I worked on many interesting projects, including :\n\n" +
    "- The Moroccan contact tracing app (wiqaytna), with the ministry of interior.\n\n" +
    "- Ray-tracing engine in C, with distributed cluster rendering.\n\n" +
    "- Doom game clone from scratch with level editor and multiplayer in C.\n\n" +
    "- Game boy and Game Boy Color Emulator in C++.\n\n" +
    "- Marketplace mobile app with backend.\n\n";

  introPage.pushComponent(new DebugBar(pixScreen));
  introPage.pushComponent(new Image("assets/profile_pic.jpeg", 0, 50));
  introPage.pushComponent(
    new Text(introText, 100, 70, "#ffffff", {
      animate: 5,
      onFinish: () => {
        introPage.pushComponent(
          new Button(250, 300, 100, 25, "   PROJECTS   ", () => {
            pageRouter.navigate("projects");
          })
        );
      },
    })
  );

  return introPage;
}
