/**
 * Represents a BottlesBar, a type of StatusBar.
 * @extends StatusBar
 */
class BottlesBar extends StatusBar {

    /**
     * The number of bottles in the BottlesBar.
     * @type {number}
     */
    bottles = 20;

    /**
     * Creates an instance of BottlesBar.
     */
    constructor() {
        super();
        this.loadImages(STATUSBAR_IMAGES.BOTTLESBAR_IMAGES);
        this.y = 50;
        this.setBottles(0);
    }

    /**
     * Sets the number of bottles in the BottlesBar.
     * @param {number} amount - The amount of bottles to add or remove.
     * @param {string} work - The operation to perform ('add' or 'remove').
     */
    setBottles(amount, work) {
        switch (work) {
            case 'add':
                this.bottles += amount;
                break;

            case 'remove':
                this.bottles -= amount;
                break;
        }
        this.changeBarValues(STATUSBAR_IMAGES.BOTTLESBAR_IMAGES, this.bottles);
    }

    /**
     * Checks if there are bottles in the BottlesBar.
     * @returns {boolean} - Returns true if there are bottles, false otherwise.
     */
    checkBottleBar() {
        if (this.bottles <= 0) {
            return false;
        } else {
            return true;
        }
    }
}
