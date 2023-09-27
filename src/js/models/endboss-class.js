class Endboss extends MovableObjekt {
    height = 500
    width = 300
    hitboxHeight = 250;
    hitboxWidth = 200;
    hitboxX = 65
    hitboxY = 100
    y = -40
    hp = 20
    demage = 30
    a = 0
    d = 0
    h = 0

    sound = AUDIOS.BOSS_CHICKEN_SOUND
    deadSound = AUDIOS.BOSS_CHICKEN_DEAD_SOUND

    constructor() {
        super().loadImage(CHICKEN_BOSS_IMAGES.IMAGES_WALKING[0])
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_WALKING)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_ATTACK)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_HURT)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_DEAD)
        this.animate()
        this.x = 719 * (levelLength - 2);

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


            clearInterval(this.walk_interval)


            setTimeout(() => {
                this.removeFromWorld(); // Hier das Chicken entfernen
            }, 2000);
        }
    }
    run() {

    }
    animate() {

        setInterval(() => {
            this.moveLeft()
            this.isDead()
        }, 1000 / 60);

        this.walk_interval =
            setInterval(() => {
                this.playAnimation(CHICKEN_BOSS_IMAGES.IMAGES_WALKING)
            }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_WALKING.length);
        this.dieing()

    }



    dieing() {
        setInterval(() => {
            if (this.dead) {
                if (this.d < CHICKEN_BOSS_IMAGES.IMAGES_DEAD.length) {
                    this.playDeathAnimation()
                } else {
                    this.died = true
                    this.disableBoss()
                }
            }
        }, 1000 / CHARACTER_IMAGES.IMAGES_DEAD.length);
    }

    playDeathAnimation() {
        this.d = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_DEAD, this.d);
    }


    disableBoss() {
        this.speed = 0
        this.demage = 0
        setTimeout(() => {
            this.stopChickenSound()
        }, 1000);
        this.deadSound.play()
        clearInterval(this.walk_interval)
        setTimeout(() => {
            this.removeFromWorld(); // Hier das Chicken entfernen
        }, 3000);
    }
}