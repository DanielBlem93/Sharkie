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
    walk_interval


    constructor() {
        super()
        this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_DEAD[0])
        this.loadImages(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        this.setRandomSpeed(0.2)
        this.setRandomPosition(500)
        this.deadSound = AUDIOS.BabyChickenDead
        this.animate()
    }


    animate() {

        setInterval(() => {
            this.moveLeft()
            this.isDead()
        }, 1000 / 60);

        this.walk_interval = setInterval(() => {
            this.playAnimation(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
    }

    isDead() {

        if (this.hp === 0) {
            this.dead = true
            this.stopChickenSound()
            setTimeout(() => {
                this.deadSound.play()
            }, 50);
        }

        if (this.dead) {
            this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_DEAD[0])
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

    stopChickenSound() {
        if (this.sound) {
            this.sound.pause(); // Den Sound anhalten
            this.deadSound.pause();
            this.sound.currentTime = 0; // Zurück auf den Anfang setzen
            this.deadSound.currentTime = 0; // Zurück auf den Anfang setzen
        }
    }




}


