class Chicken extends MovableObjekt {
    height = 100
    width = 80
    y = 330
    sound = AUDIOS.quiet_chicken
    
    constructor() {
        super()
        this.loadImage(CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImages(CHICKEN_IMAGES.IMAGES_WALKING)

        this.x = 719 + Math.random() * 719 * levelLength;
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate()
        this.randomSound()
    }

    animate() {

        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
    }

    randomSound() {
        let randomIndex = this.getRandomNumber(AUDIOS.CHICKEN_SOUND)
        this.sound = AUDIOS.CHICKEN_SOUND[randomIndex]
        this.sound.volume = 0.3
    }

    getRandomNumber(array) {
        let index = array.length - 1
        return Math.round(Math.random() * index);
    }

}

