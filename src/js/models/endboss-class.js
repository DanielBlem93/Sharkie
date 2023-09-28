class Endboss extends MovableObjekt {
    height = 500
    width = 300
    hitboxHeight = 250;
    hitboxWidth = 200;
    hitboxX = 65
    hitboxY = 100
    y = -40
    hp = 100
    demage = 30
    a = 0
    d = 0
    h = 0
    sperre = false

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
            this.disableBoss()
        }
    }

    animate() {

        setInterval(() => {
            this.moveLeft()
            this.isDead()
        }, 1000 / 60);

        this.walkInterval()
        this.dieing()

    }

    walkInterval() {
        this.walk_interval =
            setInterval(() => {
                this.playAnimation(CHICKEN_BOSS_IMAGES.IMAGES_WALKING)
            }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_WALKING.length);
    }
    hurt() {
        this.bossGodMode()
        this.hurtAnimation()
        AUDIOS.BOSS_CHICKEN_HURT_SOUND.play()
        AUDIOS.BOSS_CHICKEN_WINGS.play()
    }

    bossGodMode() {
        this.sperre = true
        setTimeout(() => {
            this.sperre = false
        }, 1000);
    }

    hurtAnimation() {
        let hurtAnimationIntervall = setInterval(() => {

            if (this.h < CHICKEN_BOSS_IMAGES.IMAGES_HURT.length && !this.dead) {
                console.log(this.h)
                clearInterval(this.walk_interval)
                this.playHurtAnimation()
                this.walkInterval()
            }
        }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_HURT.length);
        this.h = 0
        setTimeout(() => {
            clearInterval(hurtAnimationIntervall)
        }, world.character.CoolDownTime);
    }

    playHurtAnimation() {
        this.h = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_HURT, this.h);
        
    }


    dieing() {
        setInterval(() => {
            if (this.dead) {
                if (this.d < CHICKEN_BOSS_IMAGES.IMAGES_DEAD.length) {
                    this.playDeathAnimation()
                }
            }
        }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_DEAD.length);
    }

    playDeathAnimation() {
        this.d = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_DEAD, this.d);
    }

    disableBoss() {
        this.speed = 0
        this.demage = 0
        this.sound.pause()
        this.deadSound.play()
        setTimeout(() => {
            this.stopChickenSound()
        }, 2500);
        setTimeout(() => {
            this.removeFromWorld(); // Hier das Chicken entfernen
        }, 3000);
        clearInterval(this.walk_interval)
    }


}