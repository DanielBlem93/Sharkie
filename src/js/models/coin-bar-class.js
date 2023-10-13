/**
 * Class representing a status bar for displaying the number of coins.
 * Extends the StatusBar class.
 */
class Coinbar extends StatusBar {

    /**
     * The current number of coins.
     * @type {number}
     */
    coins = 0;

    /**
     * Constructor for creating a Coinbar object.
     * Sets the initial position and loads images.
     */
    constructor() {
        super();
        this.loadImages(STATUSBAR_IMAGES.COINBAR_IMAGES);
        this.y = 100;
        this.setCoins(0);
    }

    /**
     * Sets the number of coins and updates the display.
     * @param {number} coins - The number of coins to set.
     */
    setCoins(coins) {
        if (this.coins < 100) {
            this.coins += coins;
        }

        this.changeBarValues(STATUSBAR_IMAGES.COINBAR_IMAGES, this.coins);
    }
}
