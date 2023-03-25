class Page {
  constructor(path) {
    this.path = path;
    this.renderQueue = [];
  }

  pushComponent(component) {
    if (component instanceof Component) {
      this.renderQueue.push(component);
    }
  }
}

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
      this.screen.clear();
      this.screen.renderQueue = this.currentPage.renderQueue;
    }
  }
}
