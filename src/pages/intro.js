function introPage(pixScreen, pageRouter) {
    let introPage = new Page("intro");

    let introText = "Hello, My name is Aymane Biri";

    introPage.pushComponent(new DebugBar(pixScreen));
    // introPage.pushComponent(new Text(introText, 0, 300));

    introPage.pushComponent(new Image('assets/profile_pic.jpeg', pixScreen.width / 2 - 161, pixScreen.height / 2 - 161));

    return introPage;
}