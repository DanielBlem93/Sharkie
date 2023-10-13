/**
 * Class representing a Chicken, a type of movable object.
 */
class Chicken extends MovableObjekt {

    /**
     * Height of the chicken.
     * @type {number}
     */
    height = 100;

    /**
     * Width of the chicken.
     * @type {number}
     */
    width = 80;

    /**
     * Height of the hitbox.
     * @type {number}
     */
    hitboxHeight = 50;

    /**
     * Width of the hitbox.
     * @type {number}
     */
    hitboxWidth = 50;

    /**
     * X-coordinate of the hitbox.
     * @type {number}
     */
    hitboxX = 12.5;

    /**
     * Y-coordinate of the hitbox.
     * @type {number}
     */
    hitboxY = 12.5;

    /**
     * Initial y-coordinate of the chicken.
     * @type {number}
     */
    y = 330;

    /**
     * Health points of the chicken.
     * @type {number}
     */
    hp = 20;

    /**
     * Amount of damage the chicken can inflict.
     * @type {number}
     */
    demage = 20;

    /**
     * Sound associated with the chicken.
     * @type {Audio}
     */
    sound = AUDIOS.quiet_chicken;

    /**
     * Constructor for creating a Chicken object.
     * @param {number} x - The initial x-coordinate of the chicken.
     */

    constructor(x) {
        super()
        this.deadSound = AUDIOS.CHICKEN_DEAD_SOUND
        this.loadImage(CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImage(CHICKEN_IMAGES.IMAGES_DEAD[0])
        this.loadImages(CHICKEN_IMAGES.IMAGES_WALKING)
        this.setRandomSpeed(0.5)
        this.randomSound()
        this.animate()
        this.setPosition(x)
    }
/**
     * Initiates animations for the chicken.
     */
    animate() {

        this.animate_interval = setInterval(() => {
            if (gameStart) {
                this.moveLeft()
                this.isDead()
            }
        }, 1000 / 60);

        this.walk_interval = setInterval(() => {
            this.playAnimation(CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
        intervals.push(this.animate_interval);
        intervals.push(this.walk_interval);
    }

    /**
     * Randomly assigns a sound to the chicken.
     */
    randomSound() {
        let randomIndex = this.getRandomNumber(AUDIOS.CHICKEN_SOUND)
        this.sound = AUDIOS.CHICKEN_SOUND[randomIndex]
        this.sound.volume = 0.3

    }
   /**
     * Checks if the chicken is dead and initiates the dying sequence if so.
     */
    isDead() {
        if (this.hp === 0) {
            this.dead = true
            this.speed = 0
            this.demage = 0
            this.dieingSequence()
        }
    }
     /**
     * Initiates the dying sequence for the chicken.
     */
    dieingSequence() {
        this.stopChickenSound()
        setTimeout(() => {
            this.deadSound.play()
        }, 50);
        this.loadImage(CHICKEN_IMAGES.IMAGES_DEAD[0])
        clearInterval(this.walk_interval)
        setTimeout(() => {
            this.removeFromWorld();
        }, 200);
    }




}

