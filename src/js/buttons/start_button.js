/**
 * Represents a start button that inherits from the Button class.
 * @extends Button
 */
class Start_button extends Button {

    /**
     * Creates an instance of Start_button.
     * @param {number} x - The x-coordinate of the button.
     * @param {number} y - The y-coordinate of the button.
     * @param {number} width - The width of the button.
     * @param {number} height - The height of the button.
     * @param {string} image - The image path for the button.
     */
    constructor(x, y, width, height, image) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImage(image);
    }

    /**
     * Handles the click event for the start button.
     */
    onClick() {
        this.startGame();
    }

    /**
     * Starts the game, spawns enemies, and prepares for gameplay.
     */
    startGame() {
        if (!gameStart) {
            console.log('game Start');
            world.level.spawnEnemies();
            world.menu.hideMenu = true;
            tastaturGesperrt = false;
            gameStart = true;
            lastKeyPressTime = Date.now();
        }
    }
}
