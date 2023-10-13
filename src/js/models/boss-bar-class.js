/**
 * Represents a Bossbar, a type of StatusBar.
 * @extends StatusBar
 */
class Bossbar extends StatusBar {

    /**
     * Default x-coordinate of the Bossbar.
     * @type {number}
     */
    defaultX = 260;

    /**
     * Default y-coordinate of the Bossbar.
     * @type {number}
     */
    defaultY = 419;

    /**
     * Initial health value of the Bossbar.
     * @type {number}
     */
    health = 100;

    /**
     * Creates an instance of Bossbar.
     */
    constructor() {
        super();
        this.loadImages(STATUSBAR_IMAGES.HEALTHBAR_IMAGES);
        this.x = 260;
        this.y = 479;
        this.width = 200;
        this.height = 60;
    }
}