/**
 * Represents a Baby Chicken, a type of Movable Object.
 * @extends MovableObjekt
 */
class BabyChicken extends MovableObjekt {

    /**
     * Height of the Baby Chicken in pixels.
     * @type {number}
     */
    height = 50

    /**
     * Width of the Baby Chicken in pixels.
     * @type {number}
     */
    width = 50

    /**
     * Height of the hitbox of the Baby Chicken in pixels.
     * @type {number}
     */
    hitboxHeight = 50;

    /**
     * Width of the hitbox of the Baby Chicken in pixels.
     * @type {number}
     */
    hitboxWidth = 35;

    /**
     * X-coordinate of the hitbox of the Baby Chicken.
     * @type {number}
     */
    hitboxX = 10

    /**
     * Y-coordinate of the hitbox of the Baby Chicken.
     * @type {number}
     */
    hitboxY = 0

    /**
     * Initial y-coordinate of the Baby Chicken.
     * @type {number}
     */
    y = 370

    /**
     * Health points of the Baby Chicken.
     * @type {number}
     */
    hp = 20

    /**
     * Damage inflicted by the Baby Chicken.
     * @type {number}
     */
    demage = 20

    /**
     * Sound associated with the Baby Chicken.
     * @type {Audio}
     */
    sound = AUDIOS.babyChicken

    /**
     * Creates an instance of Baby Chicken.
     * @param {number} x - The initial x-coordinate of the Baby Chicken.
     */
    constructor(x) {
        super()
        this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_DEAD[0])
        this.loadImages(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        this.setRandomSpeed(1)
        this.deadSound = AUDIOS.BabyChickenDead
        this.animate()
        this.setPosition(x)
    }
   /**
     * Animates the Baby Chicken's movement.
     */
    animate() {
        this.animate_interval = setInterval(() => {
            if (gameStart) {
                this.moveLeft()
                this.isDead()
            }
        }, 1000 / 60);
        this.walk_interval = setInterval(() => {
            this.playAnimation(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
        intervals.push(this.animate_interval);
        intervals.push(this.walk_interval);
    }
    /**
     * Checks if the Baby Chicken is dead.
     */
    isDead() {
        if (this.hp === 0) {
            this.setDieingINtervall()
            this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_DEAD[0])
            clearInterval(this.walk_interval)

            setTimeout(() => {
                this.removeFromWorld();
            }, 200);
        }
    }
   /**
     * Sets the Baby Chicken as dying.
     */
    setDieingINtervall() {
        this.dead = true
        this.speed = 0
        this.demage = 0
        this.stopChickenSound()
        setTimeout(() => {
            this.deadSound.play()
        }, 100);
    }
   /**
     * Removes the Baby Chicken from the world.
     */
    removeFromWorld() {
        world.removeEnemy(this);
    }
   /**
     * Stops the sound associated with the Baby Chicken.
     */
    stopChickenSound() {
        if (this.sound) {
            this.sound.pause();
            this.deadSound.pause();
            this.sound.currentTime = 0;
            this.deadSound.currentTime = 0;
        }
    }




}


