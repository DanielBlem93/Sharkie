class BabyChicken extends MovableObjekt {

    height = 50
    width = 50
    hitboxHeight = 50;
    hitboxWidth = 35;
    hitboxX = 10
    hitboxY = 0
    y = 370
    hp = 20
    demage = 20
    sound = AUDIOS.babyChicken




    constructor(x) {
        super()
        this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_DEAD[0])
        this.loadImages(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        this.setRandomSpeed(1)
        this.deadSound = AUDIOS.BabyChickenDead
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
            this.playAnimation(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
        intervals.push(this.animate_interval);
        intervals.push(this.walk_interval);
    }

    isDead() {
        if (this.hp === 0) {
            this.dead = true
            this.speed = 0
            this.demage = 0
            this.stopChickenSound()
            setTimeout(() => {
                this.deadSound.play()
            }, 100);
            this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_DEAD[0])
            clearInterval(this.walk_interval)

            setTimeout(() => {
                this.removeFromWorld();
            }, 200);
        }
    }

    removeFromWorld() {
        world.removeEnemy(this);
    }

    stopChickenSound() {
        if (this.sound) {
            this.sound.pause();
            this.deadSound.pause();
            this.sound.currentTime = 0;
            this.deadSound.currentTime = 0;
        }
    }




}


