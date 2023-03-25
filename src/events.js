class MouseEvents {
    constructor(screen) {
        this.x = 0;
        this.y = 0;
        this.down = false;
        this.screen = screen;
        this.handle();

        this.newX = 0;
        this.newY = 0;
        this.newDown = false;
    }

    handle() {
        document.addEventListener("mousemove", (event) => {
            let rect = this.screen.dom.getBoundingClientRect();
            this.newX = Math.floor(
                (event.pageX - rect.x) / ScreenConfig.pixelSize
            );
            this.newY = Math.floor(
                (event.pageY - rect.y) / ScreenConfig.pixelSize
            );
        });
        document.addEventListener("mousedown", (event) => {
            this.down = true;
            this.newDown = true;
        });
        document.addEventListener("mouseup", (event) => {
            this.newDown = false;
        });
    }

    update() {
        this.x = this.newX;
        this.y = this.newY;
        this.down = this.newDown;
    }
}