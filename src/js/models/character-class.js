class Character extends MovableObjekt {
    x = 120;
    y = 135;//135
    height = 300;
    width = 150;
    hitboxHeight = 150;
    hitboxWidth = 75;
    hitboxX = 30
    hitboxY = 135
    speed = 10
    died = false
    jumped = false
   
    CoolDownTime = 2000 //  /1000=sec
    world;
    j = 0
    s = 0


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
                    AUDIOS.game_over.play()
                    this.fallDown()

                } else {
                    this.died = true
                    this.disableCharacter()
                }
            }
        }, 1000 / CHARACTER_IMAGES.IMAGES_DEAD.length);

    }

    disableCharacter() {
        if (this.died) {
            this.loadImage('src/img/2_character_pepe/5_dead/D-56.png')
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

    playJumpAnimation(jumpImgArray) {
        let animation;
        animation = setInterval(() => {
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
        }, 1000 / 7);
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

        if (idleTime >= 15000 && this.querrys(1)) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_LONG_IDLE);
            AUDIOS.snoring.play()
        } else { AUDIOS.snoring.pause() }
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

    hit(demage) {
        if (this.godmode) {
            console.log('Godmode on')
        } else {
            this.takingDamge(demage);
            this.godmodeON();
        }
    }

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

    fallBack() {

        if (!this.isCharacterAboveGround() && !this.dead) {
            setTimeout(() => {
                this.isFallingBack = true
                this.speedY = 20
                if (this.otherDirection === true)
                    this.pushMo('right')
                else {
                    this.pushMo('left')
                }
                setTimeout(() => {
                    this.isFallingBack = false
                }, 1000);
            }, 10);
        }
    }



    fallDown() {
        setInterval(() => {
            this.y += 3
        }, 1000 / 30);
    }

    isHurt() {

        let timepassed = new Date().getTime() - this.lastHit // differece in ms
        timepassed = timepassed / 1000 // difference in s

        return timepassed < 1
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
