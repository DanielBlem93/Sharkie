/**
 * Represents a replay button.
 * @extends Button
 */
class Replay_button extends Button {

    /**
     * Create a replay button.
     * @param {number} x - The x coordinate of the button.
     * @param {number} y - The y coordinate of the button.
     * @param {number} width - The width of the button.
     * @param {number} height - The height of the button.
     * @param {string} image - The image URL for the button.
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
     * Handles the click event for the replay button.
     */
    onClick() {
        this.restartGame()
    }

    /**
     * Restarts the game when called.
     */
    restartGame() {
        console.log('restart game')
        newGame()
    }
}
