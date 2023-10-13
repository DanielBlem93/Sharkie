/**
 * Represents a Bottle, a type of CollectableObject.
 * @extends CollectableObject
 */
class Bottle extends CollectableObject {

    /**
     * The height of the Bottle.
     * @type {number}
     */
    height = 100;

    /**
     * The width of the Bottle.
     * @type {number}
     */
    width = 100;

    /**
     * The height of the hitbox of the Bottle.
     * @type {number}
     */
    hitboxHeight = 45;

    /**
     * The width of the hitbox of the Bottle.
     * @type {number}
     */
    hitboxWidth = 45;

    /**
     * The x-coordinate of the hitbox of the Bottle.
     * @type {number}
     */
    hitboxX = 35;

    /**
     * The y-coordinate of the hitbox of the Bottle.
     * @type {number}
     */
    hitboxY = 25;

    /**
     * The sound played when the Bottle is picked up.
     * @type {string}
     */
    pickUpSound = AUDIOS.blop;

    /**
     * The index of the Bottle image.
     * @type {number}
     */
    index = this.getRandomNumber(COLLACTABLES_IMAGES.bottles);

    /**
     * Creates an instance of Bottle.
     * @param {number} x - The x-coordinate of the Bottle.
     * @param {number} y - The y-coordinate of the Bottle.
     */
    constructor(x, y) {
        super();
        this.loadImage(COLLACTABLES_IMAGES.bottles[this.index]);
        this.x = x;
        this.y = y;
    }
}
