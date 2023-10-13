/**
 * Represents a character in the game, extending MovableObject.
 * @extends MovableObject
 */
class Character extends MovableObjekt {

    /**
     * x-coordinate of the character.
     * @type {number}
     */
    x = 120;

    /**
     * y-coordinate of the character.
     * @type {number}
     */
    y = 135;

    /**
     * Height of the character.
     * @type {number}
     */
    height = 300;

    /**
     * Width of the character.
     * @type {number}
     */
    width = 150;

    /**
     * Height of the hitbox.
     * @type {number}
     */
    hitboxHeight = 150;

    /**
     * Width of the hitbox.
     * @type {number}
     */
    hitboxWidth = 50;

    /**
     * x-coordinate of the hitbox.
     * @type {number}
     */
    hitboxX = 47;

    /**
     * y-coordinate of the hitbox.
     * @type {number}
     */
    hitboxY = 135;

    /**
     * Speed of the character.
     * @type {number}
     */
    speed = 10;

    /**
     * Indicates if the character has died.
     * @type {boolean}
     */
    died = false;

    /**
     * Indicates if the character has jumped.
     * @type {boolean}
     */
    jumped = false;

    /**
     * Cooldown time in milliseconds.
     * @type {number}
     */
    CoolDownTime = 2000;

    /**
     * Reference to the world object.
     * @type {World}
     */
    world;

    /**
     * Counter variable for animations.
     * @type {number}
     */
    j = 0;

    /**
     * Counter variable for jump animation.
     * @type {number}
     */
    s = 0;

    /**
     * Creates an instance of Character.
     */
    constructor() {
        super()
        this.loadImage(CHARACTER_IMAGES.IMAGES_IDLE[1])
        this.loadImages(CHARACTER_IMAGES.IMAGES_WALKING)
        this.loadImages(CHARACTER_IMAGES.IMAGES_JUMPING)
        this.loadImages(CHARACTER_IMAGES.IMAGES_DEAD)
        this.loadImages(CHARACTER_IMAGES.IMAGES_HURT)
        this.loadImages(CHARACTER_IMAGES.IMAGES_IDLE)
        this.loadImages(CHARACTER_IMAGES.IMAGES_LONG_IDLE)
        this.applyGravity(this.isCharacterAboveGround)
        this.animate()

    }

    /**
     * Initiates character animations.
     */
    animate() {
        this.setAnimateIntervall()
        this.setCheckIntervall()
    }
    /**
        * Sets the interval for animation updates.
        */
    setAnimateIntervall() {
        this.animate_interval = setInterval(() => {
            AUDIOS.walking_sound.pause()
            this.walkingRight()
            this.walkingLeft()
            this.jumping()
            this.fixCameraOnCharacter()
        }, 1000 / 30);
        intervals.push(this.animate_interval);
    }
    /**
         * Sets the interval for checking animations.
         */
    setCheckIntervall() {
        let check = setInterval(() => {
            this.playWalkAnimation()
            this.hurtAnimation()
            this.idle()
        }, 100);
        this.dieing()
        intervals.push(check);
    }
    /**
     * fixes the camera on the Character
     */
    fixCameraOnCharacter() {
        this.world.camera_x = -this.x + 100
    }
    /**
     * sets dieing animation
     */
    dieing() {
        let dieing = setInterval(() => {
            this.dieSequence()
        }, 1000 / CHARACTER_IMAGES.IMAGES_DEAD.length);
        intervals.push(dieing);
    }
    /**
     * Executes a specific sequence when the character is dead.
     */
    dieSequence() {
        if (this.dead) {
            if (this.j < CHARACTER_IMAGES.IMAGES_DEAD.length) {
                this.playDeathAnimation()
                AUDIOS.game_over.play()
                this.fallDown()
            } else {
                this.died = true
                setTimeout(() => {
                    gameOver = true
                }, 1000);
            }
        }
    }
    /**
     * Handles character movement to the right.
     */
    walkingRight() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x && !this.dead) {
            this.otherDirection = false
            this.moveRight()
            this.playWalkingSound()
        }
    }
    /**
     * Handles character movement to the left.
     */
    walkingLeft() {
        if (this.world.keyboard.left && this.x > 0 && !this.dead) {
            this.otherDirection = true
            this.moveLeft()
            this.playWalkingSound()
        }
    }
    /**
     * Plays the walking animation.
     */
    playWalkAnimation() {

        if (this.querrys(2)) {

            this.playAnimation(CHARACTER_IMAGES.IMAGES_WALKING)
        }
    }
    /**
     * Plays the walking sound if the character is not above the ground.
     */
    playWalkingSound() {
        if (!this.isCharacterAboveGround())

            AUDIOS.walking_sound.play()
    }
    /**
     * Initiates the jump animation.
     * @param {string[]} jumpImgArray - Array of jump animation image paths.
     */
    playJumpAnimation(jumpImgArray) {
        let animation;
        animation = setInterval(() => {
            this.jumpSequence(jumpImgArray, animation)
        }, 1000 / 7);
        intervals.push(animation);
    }
    /**
     * Executes the jump sequence.
     * @param {string[]} jumpImgArray - Array of jump animation image paths.
     * @param {number} animation - Animation interval ID.
     */
    jumpSequence(jumpImgArray, animation) {
        if (this.s >= jumpImgArray.length) {
            clearInterval(animation); // Animation nach 9 Durchläufen stoppen
            this.s = 0;
            this.jumped = false
        } else if (this.s < jumpImgArray.length && !this.dead) {
            let path = jumpImgArray[this.s];
            this.img = this.imageCache[path];
            if (this.s === jumpImgArray.length - 2)
                AUDIOS.jump_landing_sound.play()
            this.s++;
        }
    }
    /**
     * Initiates a jump if specific conditions are met.
     */
    jumping() {
        if (this.world.keyboard.space && !this.isCharacterAboveGround() && !this.dead && !this.jumped && !this.godmode) {
            this.jump()
            this.playJumpAnimation(CHARACTER_IMAGES.IMAGES_JUMPING)
        }
    }
    /**
     * Plays the hurt animation if the character is in god mode and not dead.
     */
    hurtAnimation() {
        if (this.godmode && !this.dead) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_HURT)

        }
    }
    /**
     * Plays a random hurt sound.
     */
    playHurtSound() {
        let i = this.currentSound % AUDIOS.HURT_SOUNDS.length;
        AUDIOS.HURT_SOUNDS[i].play()
        this.currentSound++
    }
    /**
     * Plays the death animation.
     */
    playDeathAnimation() {
        this.j = this.animateImageOnce(CHARACTER_IMAGES.IMAGES_DEAD, this.j);
    }
    /**
     * Initiates both short and long idle animations.
     */
    idle() {
        this.shortIdleAnimation()
        this.longIdleAnimation()
    }
    /**
     * Initiates the short idle animation.
     */
    shortIdleAnimation() {
        if (this.querrys(1)) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_IDLE);
        }
    }
    /**
     * Initiates the long idle animation based on idle time.
     */
    longIdleAnimation() {
        const currentTime = Date.now();
        const idleTime = currentTime - lastKeyPressTime;

        if (idleTime >= 5000 && this.querrys(1) && gameStart) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_LONG_IDLE);
            AUDIOS.snoring.play()
        } else { AUDIOS.snoring.pause() }
    }
    /**
     * Sets a cooldown period to prevent rapid actions.
     * @returns {boolean} - Returns true if the cooldown is set, otherwise false.
     */
    setCooldown() {
        if (!this.sperre) {
            this.sperre = true
            setTimeout(() => {
                this.sperre = false;
            }, this.CoolDownTime);
            return true
        }
    }

    /**
     * If godmode isn't on initiates the taking demage sequenze
     * @param {number} demage - The amount of damage.
     */
    hit(demage) {
        if (!this.godmode) {
            this.takingDamge(demage);
            this.godmodeON();
        }
    }
    /**
       * Handles character taking damage.
       * @param {number} demage - The amount of damage.
       */
    takingDamge(demage) {
        this.energy -= demage
        this.world.statusBar.setHealth(this.energy)
        this.fallBack()
        if (this.energy <= 0) {
            this.energy = 0
            this.dead = true
        } else {
            this.lastHit = new Date().getTime()
            lastKeyPressTime = this.lastHit
            this.playHurtSound()
        }
    }
/**
 * Initiates character falling back animation.
 */

    fallBack() {
        if (!this.isCharacterAboveGround() && !this.dead) {
            setTimeout(() => {
                this.isFallingBack = true
                this.speedY = 20
                if (this.otherDirection === true)
                    this.pushMo('right')
                else
                    this.pushMo('left')
                setTimeout(() => {
                    this.isFallingBack = false
                }, 1000);
            }, 10);
        }
    }
/**
 * Initiates character falling down animation.
 */
    fallDown() {
        let fall = setInterval(() => {
            this.y += 3
        }, 1000 / 30);
        intervals.push(fall);
    }
/**
 * Checks if the character is currently hurt.
 * @returns {boolean} - Returns true if the character is currently hurt, otherwise false.
 */
    isHurt() {

        let timepassed = new Date().getTime() - this.lastHit // differece in ms
        timepassed = timepassed / 1000 // difference in s

        return timepassed < 1
    }
/**
 * Handles specific queries (q) related to character animations and movement. Located here because of the long querry for a better reading aspect
 * @param {number} q - The query to perform.
 * @returns {boolean} - Returns true if the query condition is met, otherwise false.
 */
    querrys(q) {
        if (q === 1) {
            //checks is any other animation/move running
            return !this.world.keyboard.right && !this.world.keyboard.left && !this.dead && !this.isCharacterAboveGround() && !this.jumped && !this.godmode && !this.isHurt()
        }
        else if (q === 2) {
            //disables move animation while in the air or when dead
            return this.world.keyboard.right && !this.dead && !this.isCharacterAboveGround() || this.world.keyboard.left && !this.dead && !this.isCharacterAboveGround()
        }
    }





}
