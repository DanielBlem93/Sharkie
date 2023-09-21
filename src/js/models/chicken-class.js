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
  


    constructor() {
        super()
        this.loadImage(CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImage(CHICKEN_IMAGES.IMAGES_DEAD[0])
        this.loadImages(CHICKEN_IMAGES.IMAGES_WALKING)
        this.setRandomSpeed(0.2)
        this.setRandomPosition(500)
        this.randomSound()
        this.deadSound = AUDIOS.CHICKEN_DEAD_SOUND
        this.animate()
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

    stopChickenSound() {
        if (this.sound) {
            this.sound.pause(); // Den Sound anhalten
            this.deadSound.pause();
            this.sound.currentTime = 0; // Zurück auf den Anfang setzen
            this.deadSound.currentTime = 0; // Zurück auf den Anfang setzen
        }
    }

    isDead() {

        if (this.hp === 0) {
            this.dead = true
            this.stopChickenSound()
            setTimeout(() => {
                this.deadSound.play()
            }, 50);

        }

        else if (this.dead) {
            this.loadImage(CHICKEN_IMAGES.IMAGES_DEAD[0])
            clearInterval(this.walk_interval)
            this.speed = 0
            this.demage = 0

            setTimeout(() => {
                this.removeFromWorld(); // Hier das Chicken entfernen
            }, 200);
        }
    }

    removeFromWorld() {
        world.removeEnemy(this); // Methode in der World-Klasse aufrufen
    }


}

