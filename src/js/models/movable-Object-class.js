/**
 * Represents a movable object in the game.
 * @class
 * @extends DrawableObject
 */
class MovableObjekt extends DrawableObject {
    /**
     * The default speed of the movable object.
     * @type {number}
     */
    defaultSpeed = 0.2;

    /**
     * The current speed of the movable object.
     * @type {number}
     */
    speed = this.defaultSpeed;

    /**
     * The vertical speed of the movable object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The power of jump for the movable object.
     * @type {number}
     */
    jumpPower = 27;

    /**
     * The acceleration of the movable object.
     * @type {number}
     */
    acceleration = 2;

    /**
     * The energy level of the movable object.
     * @type {number}
     */
    energy = 100;

    /**
     * The timestamp of the last hit received by the movable object.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Flag indicating if the movable object is in god mode.
     * @type {boolean}
     */
    godmode = false;

    /**
     * Flag indicating if the movable object is dead.
     * @type {boolean}
     */
    dead = false;

    /**
     * Flag indicating if the movable object is locked.
     * @type {boolean}
     */
    sperre = false;

    /**
     * The sound associated with the movable object.
     * @type {Audio}
     */
    sound;

    /**
     * The sound played when the movable object is dead.
     * @type {Audio}
     */
    deadSound;

    /**
     * The index of the current sound.
     * @type {number}
     */
    currentSound = 0;

    /**
     * Callback function for getting hit.
     * @type {function}
     */
    getHit;

    /**
     * Interval for animation.
     * @type {number}
     */
    animate_interval;

    /**
     * Interval for walking animation.
     * @type {number}
     */
    walk_interval;

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObjekt} mo - The other movable object.
     * @returns {boolean} - True if colliding, otherwise false.
     */
    isColliding(mo) {
        const hitboxX = this.x + this.hitboxX;
        const hitboxY = this.y + this.hitboxY;
        if ((mo instanceof MovableObjekt) && !(mo instanceof Endboss)) {
            return hitboxX < mo.x + mo.hitboxX + mo.hitboxWidth && hitboxY < mo.y + mo.hitboxY + mo.hitboxHeight &&
                hitboxX + this.hitboxWidth > mo.x + mo.hitboxX && hitboxY + this.hitboxHeight > mo.y + mo.hitboxY &&
                !world.character.jumped && !world.character.isFallingBack;
        } else {
            return hitboxX < mo.x + mo.hitboxX + mo.hitboxWidth && hitboxY < mo.y + mo.hitboxY + mo.hitboxHeight &&
                hitboxX + this.hitboxWidth > mo.x + mo.hitboxX && hitboxY + this.hitboxHeight > mo.y + mo.hitboxY
        }
    }
    /**
        * Checks if another movable object is in sight.
        * @param {MovableObjekt} mo - The other movable object.
        * @param {number} sightRange - The range of sight.
        * @returns {boolean} - True if in sight, otherwise false.
        */
    isInSight(mo, sightRange) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const moCenterX = mo.x + mo.width / 2;
        const moCenterY = mo.y + mo.height / 2;
        const distance = Math.sqrt((centerX - moCenterX) ** 2 + (centerY - moCenterY) ** 2);
        return distance <= sightRange;
    }
    /**
     * Sets the position of the movable object.
     * @param {number} x - The x-coordinate to set. If not provided, a random position is set within a specified range.
     */
    setPosition(x) {
        if (x)
            this.x = x
        else
            this.setRandomPosition(500)
    }
    /**
     * Sets a random speed for the movable object.
     * @param {number} speed - The base speed for the object.
     */
    setRandomSpeed(speed) {
        this.speed = speed + Math.random() * 0.3;
    }
    /**
    * Sets a random position for the movable object within a specified range.
    * @param {number} minPosition - The minimum position for the object.
    */
    setRandomPosition(minPosition) {
        this.x = minPosition + Math.random() * 719 * (levelLength + 1);
    }

    /**
     * Turns on god mode for the movable object for a specified duration.
     */
    godmodeON() {
        this.godmode = true
        setTimeout(() => {
            this.godmode = false
        }, 1000);
    }
    /**
     * Plays an animation for the movable object using a set of images.
     * @param {string[]} images - Array of paths to the images for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 8%6 0> 1, Rest 2
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }
    /**
     * Animates the movable object using a set of images, progressing through each image once.
     * @param {string[]} imagesArray - Array of paths to the images for animation.
     * @param {number} currentIndex - The current index in the array.
     * @returns {number} - The updated index after animation.
     */
    animateImageOnce(imagesArray, currentIndex) {
        let path = imagesArray[currentIndex];
        this.img = this.imageCache[path];
        currentIndex++;
        return currentIndex;
    }
    /**
     * Applies gravity to the movable object based on a specified condition.
     * @param {function} gravityOn - The gravity condition function.
     */
    applyGravity(gravityOn) {
        setInterval(() => {
            if (gravityOn.call(this) || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
            } else { }
        }, 1000 / 25);
    }
    /**
     * Checks if the character is above the ground.
     * @returns {boolean} - True if character is above ground, otherwise false.
     */
    isCharacterAboveGround() {
        return this.y < 135
    }

    /**
 * Checks if the bottle is above the ground.
 * @returns {boolean} - True if bottle is above ground, otherwise false.
 */
    isBottleAboveGround() {
        return this.y < 350
    }
    /**
     * Initiates a jump action for the movable object.
     */
    jump() {
        if (!this.jumped) {
            AUDIOS.jumping_sound.play()
            this.jumped = true
            setTimeout(() => {
                this.speedY = this.jumpPower
            }, 10);
        }
    }
    /**
    * Moves the object to the right.
    */
    moveRight() {
        this.x += this.speed
    }
    /**
    * Moves the object to the left.
    */
    moveLeft() {
        this.x -= this.speed
    }
    /**
     * Initiates a pushing action for the movable object.
     * @param {string} left - Direction of push ('left' or 'right').
     */
    pushMo(left) {
        let push = setInterval(() => {
            if (left === 'left') {
                this.moveLeft()
            }
            else {
                this.moveRight()
            }
            this.disableBoard()
        }, 1000 / 30);
        setTimeout(() => {
            clearInterval(push)
        }, 500);
    }
    /**
     * Disables keyboard input for the movable object (if it's an instance of Character).
     */
    disableBoard() {
        if (this instanceof Character) {
            keyboard.right = false
            keyboard.left = false
        }
    }
    /**
       * Plays the sound associated with the movable object.
       */
    playEnemySound() {
        this.sound.play()
    }
    /**
       * Stops the sound associated with the movable object.
       */
    stopChickenSound() {
        if (this.sound) {
            this.sound.pause(); // Den Sound anhalten
            this.deadSound.pause();
            this.sound.currentTime = 0; // Zurück auf den Anfang setzen
            this.deadSound.currentTime = 0; // Zurück auf den Anfang setzen
        }
    }

    /**
        * Removes the movable object from the world.
        */
    removeFromWorld() {
        world.removeEnemy(this); // Methode in der World-Klasse aufrufen
    }


}
