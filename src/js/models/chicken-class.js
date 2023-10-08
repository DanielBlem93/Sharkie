class Chicken extends MovableObjekt {
    height = 100
    width = 80
    hitboxHeight = 50;
    hitboxWidth = 50;
    hitboxX = 12.5
    hitboxY = 12.5
    y = 330
    hp = 20
    demage = 20
    sound = AUDIOS.quiet_chicken



    constructor(x) {
        super()
        this.deadSound = AUDIOS.CHICKEN_DEAD_SOUND
        this.loadImage(CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImage(CHICKEN_IMAGES.IMAGES_DEAD[0])
        this.loadImages(CHICKEN_IMAGES.IMAGES_WALKING)
        this.setRandomSpeed(0.5)
        this.randomSound()
        this.animate()
        this.setPosition(x)
    }

    animate() {

        this.animate_interval = setInterval(() => {
            if (gameStart) {
                this.moveLeft()
                this.isDead()
            }
        }, 1000 / 60);

        this.walk_interval = setInterval(() => {
            this.playAnimation(CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
        intervals.push(this.animate_interval);
        intervals.push(this.walk_interval);
    }

    randomSound() {
        let randomIndex = this.getRandomNumber(AUDIOS.CHICKEN_SOUND)
        this.sound = AUDIOS.CHICKEN_SOUND[randomIndex]
        this.sound.volume = 0.3

    }

    isDead() {

        if (this.hp === 0) {
            this.dead = true
            this.speed = 0
            this.demage = 0
            this.stopChickenSound()
            setTimeout(() => {
                this.deadSound.play()
            }, 50);

            this.loadImage(CHICKEN_IMAGES.IMAGES_DEAD[0])
            clearInterval(this.walk_interval)

            setTimeout(() => {
                this.removeFromWorld();
            }, 200);
        }
    }




}

