class PageRouter {
  constructor(screen) {
    this.pages = {};
    this.screen = screen;
  }

  addPage(page) {
    if (page instanceof Page) {
      this.pages[page.path] = page;
    }
  }

  navigate(path) {
    if (this.pages[path] !== undefined) {
      this.currentPage = this.pages[path];
      this.screen.switchPage(this.currentPage);
    }
  }
}
