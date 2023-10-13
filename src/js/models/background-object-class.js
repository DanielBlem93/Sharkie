/**
 * Represents a Background Object, a type of Movable Object.
 * @extends MovableObjekt
 */
class BackgroundObject extends MovableObjekt {

    /**
     * Width of the Background Object in pixels.
     * @type {number}
     */
    width = 720;

    /**
     * Height of the Background Object in pixels.
     * @type {number}
     */
    height = 480;

    /**
     * Creates an instance of Background Object.
     * @param {string} imagePath - The file path of the image for the Background Object.
     * @param {number} x - The initial x-coordinate of the Background Object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath)
        this.x = x;
        this.y = 480 - this.height;
    }
}
