/**
 * Class representing a throwable object.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObjekt {
    hitboxHeight = 35;
    hitboxWidth = 35;
    hitboxX = 17
    hitboxY = 20
    t = 0
    r = 0
    intervalId
    bottleOnGround = false

    /**
     * Create a ThrowableObject.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x, y) {
        super()
        this.loadImage(THROWABLES_IMAGES.BOTTLE_IMAGES[1])
        this.loadImages(THROWABLES_IMAGES.BOTTLE_IMAGES)
        this.loadImages(THROWABLES_IMAGES.SPLASH_IMAGES)
        this.x = x
        this.y = y
        this.width = 70
        this.height = 80
        this.throwInDirection()
    }

    /**
     * Throws the object in the direction of the character.
     */
    throwInDirection() {
        if (!world.character.otherDirection) {
            this.throw('right')
        } else if (world.character.otherDirection) {
            this.throw('left')
        }
        AUDIOS.throw_sound.play()
    }

    /**
     * Throws the object in a specific direction.
     * @param {string} direction - The direction to throw ('right' or 'left').
     */
    throw(direction) {
        this.speedY = 25
        this.applyGravity(this.isBottleAboveGround)
        this.setThrowInterval(direction)
    }

    /**
     * Sets an interval for throwing the object.
     * @param {string} direction - The direction to throw ('right' or 'left').
     */
    setThrowInterval(direction) {
        this.intervalId = setInterval(() => {
            if (direction === 'right')
                this.throwRight()
            else if (direction === 'left')
                this.throwLeft()
            this.checkBottleOnGround()
        }, 1000 / 60);
        this.bottleCracking()
        world.bottlesBar.setBottles(10, 'remove')
        intervals.push(this.intervalId);
    }

    /**
     * Throws the object to the right.
     */
    throwRight() {
        this.x += 5
    }

    /**
     * Throws the object to the left.
     */
    throwLeft() {
        this.x -= 5
    }

    /**
     * Checks if the bottle has hit the ground.
     */
    checkBottleOnGround() {
        if (this.y >= 350) {
            this.bottleOnGround = true
            clearInterval(this.intervalId)
        }
    }

    /**
     * Checks if there are bottles available in the bottles bar.
     * @returns {boolean} - True if bottles are available, false otherwise.
     */
    checkBottleBar() {
        if (world.bottlesBar.bottles <= 0) {
            return false
        } else {
            return true
        }
    }

    /**
     * Initiates the bottle cracking animation.
     */
    bottleCracking() {
        setInterval(() => {
            if (this.bottleOnGround) {
                if (this.t < THROWABLES_IMAGES.SPLASH_IMAGES.length) {
                    this.splashAnimation()
                    this.destroyBottle()
                    AUDIOS.bottleCracking_sound.play()
                }
            } else if (!this.bottleOnGround) {
                this.playAnimation(THROWABLES_IMAGES.BOTTLE_IMAGES)
            }
        }, 1000 / 8);
    }

    /**
     * Destroys the bottle object after the splash animation is completed.
     */
    destroyBottle() {
        if (this.t >= THROWABLES_IMAGES.SPLASH_IMAGES.length)
            world.bottles.splice(0, 1)
    }

    /**
     * Initiates the splash animation.
     */
    splashAnimation() {
        this.t = this.animateImageOnce(THROWABLES_IMAGES.SPLASH_IMAGES, this.t);
    }

    /**
     * Initiates the rotation animation.
     */
    rotateAnimation() {
        this.r = this.animateImageOnce(THROWABLES_IMAGES.BOTTLE_IMAGES, this.r);
    }
}
