class Chicken extends MovableObjekt {
    height = 100
    width = 80
    y = 330
    hp = 20
    demage = 20
    sound = AUDIOS.quiet_chicken
    walk_interval

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
            this.isDead()
        }, 1000 / 60);

        this.walk_interval = setInterval(() => {
            this.playAnimation(CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
    }

    randomSound() {
        let randomIndex = this.getRandomNumber(AUDIOS.CHICKEN_SOUND)
        this.sound = AUDIOS.CHICKEN_SOUND[randomIndex]
        this.sound.volume = 0.3
    }

    isDead() {

        if (this.hp === 0) {
            this.dead = true
        }

        else if (this.dead) {
            this.loadImage(CHICKEN_IMAGES.IMAGES_DEAD[0])
            this.speed = 0
            clearInterval(this.walk_interval)
            this.demage = 0
            setTimeout(() => {
                this.removeFromWorld(); // Hier das Chicken entfernen
            }, 500);
        }
    }

    removeFromWorld() {
        world.removeEnemy(this); // Methode in der World-Klasse aufrufen
    }


}

