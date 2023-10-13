/**
 * Class representing an icon for the boss health bar.
 * Extends the Bossbar class.
 */
class Boss_bar_icon extends Bossbar {

    /**
     * Width of the boss bar icon.
     * @type {number}
     */
    width = 70;

    /**
     * Height of the boss bar icon.
     * @type {number}
     */
    height = 70;

    /**
     * Default x-coordinate of the boss bar icon.
     * @type {number}
     */
    defaultX = 238;

    /**
     * Default y-coordinate of the boss bar icon.
     * @type {number}
     */
    defaultY = 422;

    /**
     * Constructor for creating a Boss_bar_icon object.
     */
    constructor() {
        super();
        this.x = 238;
        this.y = 482;
        this.loadImage(STATUSBAR_IMAGES.BOSSBAR_IMAGES[0]);
    }
}
