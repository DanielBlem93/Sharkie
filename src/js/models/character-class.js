class Character extends MovableObjekt {
    x = 120;
    y = 135;//135
    height = 300;
    width = 150;
    speed = 10
    dead = false
    died = false
    j = 0
    s = 0
    jumped = false


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

    world;
    walking_sound = new Audio('src/audio/character/running.mp3')


    constructor() {
        super()
        this.loadImage('src/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_HURT)
        this.applyGravity(this.isCharacterAboveGround)
        this.animate()

    }



    animate() {
        setInterval(() => {
            this.walking_sound.pause()
            this.walkingRight()
            this.walkingLeft()
            this.fixCameraOnCharacter()

        }, 1000 / 30);

        setInterval(() => {

            this.jumping()
            this.playWalkAnimation()
            this.hurtAnimation()

        }, 60);

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

    playWalkAnimation() {

        if (this.world.keyboard.right && !this.dead && !this.isCharacterAboveGround() ||
            this.world.keyboard.left && !this.dead && !this.isCharacterAboveGround()) {

            this.playAnimation(this.IMAGES_WALKING)
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

    playWalkingSound() {
        if (!this.isCharacterAboveGround())
            this.walking_sound.play()
    }

    jumping() {
        if (this.world.keyboard.space && !this.isCharacterAboveGround() && !this.dead && !this.jumped) {
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















}
