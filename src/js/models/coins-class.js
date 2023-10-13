/**
 * Class representing a collectable coin object.
 * Extends the CollectableObject class.
 */
class Coin extends CollectableObject {

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 150;

    /**
     * The height of the hitbox.
     * @type {number}
     */
    hitboxHeight = 45;

    /**
     * The width of the hitbox.
     * @type {number}
     */
    hitboxWidth = 45;

    /**
     * The x-coordinate of the hitbox.
     * @type {number}
     */
    hitboxX = 52;

    /**
     * The y-coordinate of the hitbox.
     * @type {number}
     */
    hitboxY = 52;

    /**
     * The sound played when the coin is picked up.
     * @type {string}
     */
    pickUpSound = AUDIOS.collect_coin;

    /**
     * Constructor for creating a Coin object.
     * Loads the coin image and sets its initial position.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {

        super();
        this.loadImage(COLLACTABLES_IMAGES.coins[0]);
        this.x = x;
        this.y = y;
    }
}
