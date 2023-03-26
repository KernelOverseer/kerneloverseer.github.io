function uiTestingPage(pixScreen, pageRouter) {
    let testingPage = new Page("testing");
    testingPage.pushComponent(
        new Button(275, 200, 50, 25, "TEST")
    );
    testingPage.pushComponent(new DebugBar(pixScreen));
    return testingPage;
}