/**
 * Class representing a cloud object that moves leftwards.
 * Extends the MovableObjekt class.
 */
class Cloud extends MovableObjekt {

    /**
     * The y-coordinate of the cloud object.
     * @type {number}
     */
    y = 0;

    /**
     * The height of the cloud object.
     * @type {number}
     */
    height = 300;

    /**
     * The width of the cloud object.
     * @type {number}
     */
    width = 500;

    /**
     * The speed at which the cloud moves.
     * @type {number}
     */
    speed = 0.25;

    /**
     * Constructor for creating a Cloud object.
     * Randomly positions the cloud on the x-axis.
     */
    constructor() {
        super().loadImage(BACKGROUND_IMAGES.cloud);
        this.x = Math.random() * 719 * levelLength;
        this.animate();
    }

    /**
     * Animates the cloud by moving it leftwards.
     */
    animate() {
        this.animate_interval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
        intervals.push(this.animate_interval);
    }
}
