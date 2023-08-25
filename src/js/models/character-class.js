class Character extends MovableObjekt {
    x = 120;
    y = 0;//135
    height = 300;
    width = 150;
    speed = 10

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
        'src/img/2_character_pepe/3_jump/J-40.png',
    ]

    world;
    walking_sound = new Audio('src/audio/character/running.mp3')


    constructor() {
        super().loadImage('src/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.applyGravity()
        this.animate()
    }
    animate() {
        setInterval(() => {
            this.walking_sound.pause()
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.otherDirection = false
                this.moveRight()
                this.walking_sound.play()
            }

            if (this.world.keyboard.left && this.x > 0) {
                this.otherDirection = true
                this.moveLeft()
                this.walking_sound.play()
            }

            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.jump()
            }

            this.world.camera_x = -this.x + 100
        }, 1000 / 30);

        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)

            } else {

                if (this.world.keyboard.right || this.world.keyboard.left) {

                    //walk animation
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
        }, 60);
    }
}