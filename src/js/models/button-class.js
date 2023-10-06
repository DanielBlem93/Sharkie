class Button extends DrawableObject {
    constructor(x, y, width, height, image) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImage(image);

    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }

    onClick() {
        this.startGame()
    }



    startGame() {
        console.log('game Start');
        world.level.spawnEnemies()
        world.menu = null
        tastaturGesperrt = false
        gameStart = true
        lastKeyPressTime = Date.now()
    }

}



