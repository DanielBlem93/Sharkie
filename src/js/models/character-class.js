class Character extends MovableObjekt {

    speed = 10

    IMAGES_WALKING = [
        'src/img/2_character_pepe/2_walk/W-21.png',
        'src/img/2_character_pepe/2_walk/W-22.png',
        'src/img/2_character_pepe/2_walk/W-23.png',
        'src/img/2_character_pepe/2_walk/W-24.png',
        'src/img/2_character_pepe/2_walk/W-25.png',
        'src/img/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    walking_sound = new Audio('src/audio/character/running.mp3')


    constructor() {
        super().loadImage('src/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)

        this.animate()
    }
    animate() {
        setInterval(() => {
            if (this.world.keyboard.right  && this.x < this.world.level.level_end_x) {
                this.x += this.speed
                this.otherDirection = false
                this.walking_sound.play()
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.x -= this.speed
                this.otherDirection = true
            }
            this.world.camera_x = -this.x + 100
        }, 1000 / 60);
        setInterval(() => {

            if (this.world.keyboard.right || this.world.keyboard.left) {

                //walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 8%6 0> 1, Rest 1
                let path = this.IMAGES_WALKING[i]
                this.img = this.imageCache[path]
                this.currentImage++
            }
        }, 50);
    }
    jump() {
        console.log('jump')
    }
}