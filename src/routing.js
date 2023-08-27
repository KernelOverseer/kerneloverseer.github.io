class PageRouter {
  constructor(screen) {
    this.pages = {};
    this.history = [];
    this.screen = screen;
  }

  addPage(page) {
    if (page instanceof Page) {
      this.pages[page.path] = page;
    }
  }

  switchPage(path) {
    if (this.pages[path] !== undefined) {
      this.currentPage = this.pages[path] = this.pages[path].reload(this);
      // change document.title
      document.title = this.currentPage.path;
      // switch page renderered on the screen
      this.screen.switchPage(this.currentPage);
      return true;
    }
    return false;
  }

  navigate(path) {
    console.log("HISTORY", this.history);
    if (this.switchPage(path)) {
      // push history
      this.history.push(path);
    }
  }

  back() {
    if (this.history.length > 1) {
      this.history.pop();
      const path = this.history[this.history.length - 1];
      // reload page
      this.switchPage(path);
    }
  }
}
