class Character extends MovableObjekt {
    x = 120;
    y = 135;//135
    height = 300;
    width = 150;
    speed = 10
    dead = false
    died = false
    jumped = false
    sperre = false
    CoolDownTime = 1500 //  /1000=sec
    j = 0
    s = 0
    world;
  
    currentSound = 0


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

    animate() {
        setInterval(() => {
            AUDIOS.walking_sound.pause()
            this.walkingRight()
            this.walkingLeft()
            this.jumping()
            this.fixCameraOnCharacter()
        }, 1000 / 30);

        setInterval(() => {
            this.playWalkAnimation()
            this.hurtAnimation()
        }, 100);

        setInterval(() => {
            this.idle()
        }, 150);

        this.dieing()
    }


    fixCameraOnCharacter() {
        this.world.camera_x = -this.x + 100
    }


    dieing() {
        setInterval(() => {
            if (this.dead) {
                if (this.j < CHARACTER_IMAGES.IMAGES_DEAD.length) {
                    this.playDeathAnimation()

                } else {
                    this.died = true
                    this.disableCharacter()
                }
            }
        }, 1000 / 7);
    }

    disableCharacter() {
        if (this.died) {
            this.loadImage('src/img/2_character_pepe/5_dead/D-57.png')
        }
    }



    walkingRight() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x && !this.dead) {
            this.otherDirection = false
            this.moveRight()
            this.playWalkingSound()
        }
    }

    walkingLeft() {
        if (this.world.keyboard.left && this.x > 0 && !this.dead) {
            this.otherDirection = true
            this.moveLeft()
            this.playWalkingSound()
        }
    }

    playWalkAnimation() {

        if (this.querrys(2)) {

            this.playAnimation(CHARACTER_IMAGES.IMAGES_WALKING)
        }
    }

    playWalkingSound() {
        if (!this.isCharacterAboveGround())

            AUDIOS.walking_sound.play()
    }

    jumping() {
        if (this.world.keyboard.space && !this.isCharacterAboveGround() && !this.dead && !this.jumped && !this.godmode) {
            this.jump()
            this.playJumpAnimation(CHARACTER_IMAGES.IMAGES_JUMPING)
        }
    }

    hurtAnimation() {
        if (this.godmode && !this.dead) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_HURT)

        }
    }

    playHurtSound() {
        let i = this.currentSound % AUDIOS.HURT_SOUNDS.length;
        AUDIOS.HURT_SOUNDS[i].play()
        this.currentSound++
    }

    playDeathAnimation() {
        this.j = this.animateImageOnce(CHARACTER_IMAGES.IMAGES_DEAD, this.j);
    }

    idle() {
        this.shortIdleAnimation()
        this.longIdleAnimation()
    }

    shortIdleAnimation() {
        if (this.querrys(1)) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_IDLE);
        }
    }

    longIdleAnimation() {
        const currentTime = Date.now();
        const idleTime = currentTime - lastKeyPressTime;

        if (idleTime >= 5000 && this.querrys(1)) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_LONG_IDLE);
        }
    }

    setCooldown() {
        if (!this.sperre) {
            this.sperre = true
            setTimeout(() => {
                this.sperre = false;
            }, this.CoolDownTime);
            return true
        }
    }

    collectItem() {
        console.log('coin gesammelt')
        this.world.coinBar.setCoins(4)
    }

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
