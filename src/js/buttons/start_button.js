class Start_button extends Button {


    constructor(x, y, width, height, image) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImage(image);


    }

    

    onClick() {
        this.startGame()
    }

    startGame() {
        if (!gameStart) {
            console.log('game Start');
            world.level.spawnEnemies()
            world.menu.hideMenu = true
            tastaturGesperrt = false
            gameStart = true
            lastKeyPressTime = Date.now()
        }
    }

}