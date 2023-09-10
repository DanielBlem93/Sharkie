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
    CoolDownTime = 1300 //  /1000=sec
    j = 0
    s = 0


    IMAGES_WALKING = [
        'src/img/2_character_pepe/2_walk/W-21.png',
        'src/img/2_character_pepe/2_walk/W-22.png',
        'src/img/2_character_pepe/2_walk/W-23.png',
        'src/img/2_character_pepe/2_walk/W-24.png',
        'src/img/2_character_pepe/2_walk/W-25.png',
        'src/img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [

        'src/img/2_character_pepe/3_jump/J-31.png',
        'src/img/2_character_pepe/3_jump/J-32.png',
        'src/img/2_character_pepe/3_jump/J-33.png',
        'src/img/2_character_pepe/3_jump/J-34.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-36.png',
        'src/img/2_character_pepe/3_jump/J-37.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_DEAD = [
        'src/img/2_character_pepe/5_dead/D-51.png',
        'src/img/2_character_pepe/5_dead/D-52.png',
        'src/img/2_character_pepe/5_dead/D-53.png',
        'src/img/2_character_pepe/5_dead/D-54.png',
        'src/img/2_character_pepe/5_dead/D-55.png',
        'src/img/2_character_pepe/5_dead/D-56.png',
        'src/img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_HURT = [
        'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_IDLE = [
        'src/img/2_character_pepe/1_idle/idle/I-1.png',
        'src/img/2_character_pepe/1_idle/idle/I-2.png',
        'src/img/2_character_pepe/1_idle/idle/I-3.png',
        'src/img/2_character_pepe/1_idle/idle/I-4.png',
        'src/img/2_character_pepe/1_idle/idle/I-5.png',
        'src/img/2_character_pepe/1_idle/idle/I-6.png',
        'src/img/2_character_pepe/1_idle/idle/I-7.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONG_IDLE = [
        'src/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    world;
    walking_sound = new Audio('src/audio/character/running.mp3')


    constructor() {
        super()
        this.loadImage('src/img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
        this.applyGravity(this.isCharacterAboveGround)
        this.animate()

    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause()
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
                if (this.j < this.IMAGES_DEAD.length) {
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

            this.playAnimation(this.IMAGES_WALKING)
        }
    }

    playWalkingSound() {
        if (!this.isCharacterAboveGround())
            this.walking_sound.play()
    }

    jumping() {
        if (this.world.keyboard.space && !this.isCharacterAboveGround() && !this.dead && !this.jumped && !this.godmode) {
            this.jump()
            this.playJumpAnimation(this.IMAGES_JUMPING)
        }
    }

    hurtAnimation() {
        if (this.godmode && !this.dead) {
            this.playAnimation(this.IMAGES_HURT)
        }
    }

    playDeathAnimation() {
        this.j = this.animateImageOnce(this.IMAGES_DEAD, this.j);
    }

    idle() {
        this.shortIdleAnimation()
        this.longIdleAnimation()
    }

    shortIdleAnimation() {
        if (this.querrys(1)) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    longIdleAnimation() {
        const currentTime = Date.now();
        const idleTime = currentTime - lastKeyPressTime;

        if (idleTime >= 5000 && this.querrys(1)) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
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
