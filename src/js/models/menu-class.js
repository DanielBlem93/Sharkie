/**
 * Represents a menu in the game.
 * @class
 * @extends DrawableObject
 */
class Menu extends DrawableObject {
    /**
     * The x-coordinate of the menu.
     * @type {number}
     */
    x = 0;

    /**
     * The y-coordinate of the menu.
     * @type {number}
     */
    y = 0;

    /**
     * The width of the menu.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the menu.
     * @type {number}
     */
    height = 480;

    /**
     * Array of buttons in the menu.
     * @type {Button[]}
     */
    buttons = [];

    /**
     * Flag indicating if the menu is hidden.
     * @type {boolean}
     */
    hideMenu = false;

    /**
     * The start button in the menu.
     * @type {Start_button}
     */
    startButton;

    /**
     * The replay button in the menu.
     * @type {Replay_button}
     */
    replayButton;

    /**
     * Creates an instance of Menu.
     * @param {number} x - The x-coordinate of the menu.
     * @param {number} y - The y-coordinate of the menu.
     * @param {number} width - The width of the menu.
     * @param {number} height - The height of the menu.
     * @param {string} image - The path to the menu image.
     */
    constructor(x, y, width, height, image) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.startButton = new Start_button(270, 25, 200, 80, MENU_IMAGES.start_game_button); //x,y,width,height,img
        this.loadImage(image);
        this.pushButtons(this.startButton);
    }

    /**
     * Adds a button to the menu.
     * @param {Button} btn - The button to be added.
     */
    pushButtons(btn) {
        this.buttons.push(btn);
    }
}
