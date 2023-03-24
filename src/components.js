class Component {
    constructor() {
        this.ended = false;
    }

    render(screen) {
    }
}

class Text extends Component {
    constructor(content, x, y, color = 255, animate = 1, lineBreak = true) {
        super();
        this.content = content;
        if (this.content instanceof String)
            this.content = this.content.toUpperCase()
        this.animate = animate;
        this.lineBreak = lineBreak;
        this.x = x;
        this.y = y;
        this.currX = x;
        this.currY = y;
        this.color = color;
        this.index = 0;
    }

    newLine() {
        this.currX = this.x;
        this.currY += 6;
    }

    renderLetter(screen) {
        let letter = FONT[this.content[this.index]];
        if (letter != undefined) {
            for (let i = 0; i < letter.length; i++) {
                for (let j = 0; j < letter[i].length; j++) {
                    if (this.lineBreak && this.currX >= screen.width)
                        this.newLine();
                    screen.putPixel(this.currX + j, this.currY + i, letter[i][j] * this.color);
                }
            }
            this.currX += 6;
        }
        else if (this.content[this.index] == '\n') {
            this.newLine();
        }
    }

    render(screen) {
        let i = 0;
        if (this.index >= this.content.length)
            this.ended = true;
        while (this.index < this.content.length) {
            this.renderLetter(screen);
            this.index++;
            i++;
            if (i > this.animate)
                break;
        }
    }
}

class RenderQueueIndicator extends Text {
    constructor(screen) {
        super("0", 0, screen.height - 5, 255, false, false);
        this.screen = screen;
        this.lastSize = 1;
    }

    render(screen) {
        screen.clear(0, this.screen.height - 5, this.lastSize * 6, 5);
        this.content = `${this.screen.renderQueue.length}`
        this.index = 0;
        this.currX = this.x;
        this.currY = this.y;
        while (this.index < this.content.length) {
            this.renderLetter(screen);
            this.index++;
        }
        this.lastSize = this.content.length;
    }
}

class Image extends Component {
    constructor(content, x, y) {
        this.x = x;
        this.y = y;
        this.content = content;
        this.height = content.length;
        this.width = content[0]?.length;
    }

    render(screen) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                screen.putPixel(this.x + j, this.y + i, this.content[i][j]);
            }
        }
    }
}