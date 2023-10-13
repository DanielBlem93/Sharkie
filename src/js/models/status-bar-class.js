/**
 * Represents a status bar for displaying health or other similar values.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * The current health or value to display in the status bar.
     * @type {number}
     */
    health = 100;

    /**
     * Creates a new StatusBar instance.
     */
    constructor() {
        super();
        this.loadImages(STATUSBAR_IMAGES.HEALTHBAR_IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setHealth(this.health);
    }

    /**
     * Sets the health or value to be displayed in the status bar.
     * @param {number} hp - The health or value to set.
     */
    setHealth(hp) {
        this.health = hp;
        this.changeBarValues(STATUSBAR_IMAGES.HEALTHBAR_IMAGES, this.health);
    }

    /**
     * Updates the status bar image based on the given variable and available image array.
     * @param {string[]} arr - Array of image paths representing the status bar values.
     * @param {number} variable - The variable value to determine the image.
     */
    changeBarValues(arr, variable) {
        let path = arr[this.resolveImageIndex(variable)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the variable value.
     * @param {number} variable - The variable value.
     * @returns {number} - The index for the image array.
     */
    resolveImageIndex(variable) {
        switch (true) {
            case variable >= 100:
                return 0;
            case variable >= 80:
                return 1;
            case variable >= 60:
                return 2;
            case variable >= 40:
                return 3;
            case variable >= 20:
                return 4;
            default:
                return 5;
        }
    }
}
