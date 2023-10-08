class Endboss extends MovableObjekt {
    height = 500
    width = 300
    y = -40
    hitboxHeight = 250;
    hitboxWidth = 200;
    hitboxX = 65
    hitboxY = 100
    hp = 100
    demage = 30
    jumpAtttackHight = 12
    jumpAttackDistanz = 12
    attackLoop = 5000
    bossAktive = false
    introAnimation = false

    a = 0
    d = 0
    h = 0
    al = 0

    hurtAnimationIntervall
    attackIntervall
    jumpAttackIntervall
    alertIntervall

    sound = AUDIOS.BOSS_CHICKEN_SOUND
    deadSound = AUDIOS.BOSS_CHICKEN_DEAD_SOUND
    attackSound = AUDIOS.BOSS_CHICKEN_ATTACK_SOUND
    bossMusic = AUDIOS.boss_song

    constructor() {
        super().loadImage(CHICKEN_BOSS_IMAGES.IMAGES_WALKING[0])
        this.applyGravity(this.isBossAboveGround)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_ALERT)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_WALKING)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_ATTACK)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_HURT)
        this.loadImages(CHICKEN_BOSS_IMAGES.IMAGES_DEAD)
        this.animate()
        this.x = 719 * (levelLength - 2);
    }

    isBossAboveGround() {
        return this.y < -40
    }

    animate() {
        setInterval(() => {
            this.walk()
            this.isDead()
            this.alert()
            setTimeout(() => {
                this.checkBossHp()
            }, 100);
        }, 1000 / 60);

        this.walkInterval()
        this.dieing()
    }

    walk() {
        if (this.otherDirection)
            this.moveRight()
        else
            this.moveLeft()
    }

    isDead() {
        if (this.hp === 0) {
            this.dead = true
            this.disableBoss()
            gameWon = true
        }
    }

    alert() {
        if (!this.bossAktive)
            this.speed = 0

        else if (this.bossAktive && !this.introAnimation) {
            this.playBossMusic()
            clearInterval(this.walk_interval)
            this.setAlertIntervall()
            this.introAnimation = true
            tastaturSperren()
            this.showBossHp()
        }
    }

    checkBossHp() {
        world.bossBar.setHealth(this.hp)
    }

    walkInterval() {
        this.speed = 0.25
        this.walk_interval =
            setInterval(() => {
                this.playAnimation(CHICKEN_BOSS_IMAGES.IMAGES_WALKING)
                this.moveLeft()
            }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_WALKING.length);
    }

    dieing() {
        setInterval(() => {
            if (this.dead) {
                if (this.d < CHICKEN_BOSS_IMAGES.IMAGES_DEAD.length) {
                    this.playDeathAnimation()
                    this.clearJumpAttackIntervall()
                }
            }
        }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_DEAD.length);
    }

    disableBoss() {
        this.speed = 0
        this.demage = 0
        this.sound.pause()
        this.deadSound.play()
        clearInterval(this.walk_interval)
        setTimeout(() => { this.stopChickenSound() }, 2500);
        setTimeout(() => { this.removeFromWorld(); }, 3000);
    }

    playBossMusic() {
        AUDIOS.theme_song.pause()
        this.bossMusic.play()
    }

    setAlertIntervall() {
        this.alertIntervall =
            setInterval(() => {
                if (this.al < CHICKEN_BOSS_IMAGES.IMAGES_ALERT.length) {
                    this.alertAnimation()
                }
            }, 1500 / CHICKEN_BOSS_IMAGES.IMAGES_ALERT.length);
    }

    showBossHp() {
        world.bossBar.y = world.bossBar.defaultY
        world.bossBarIcon.y = world.bossBarIcon.defaultY
    }

    playDeathAnimation() {
        this.d = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_DEAD, this.d);
    }

    clearJumpAttackIntervall() {
        setTimeout(() => {
            this.attackSound.pause()
            this.attackSound.currentTime = 0
            clearInterval(this.jumpAttackIntervall)
        }, 700);
    }

    alertAnimation() {
        this.al = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_ALERT, this.al);
        if (this.al === 6) {
            this.attackSound.play()
            this.sound.loop = true
            this.sound.play()
            this.walkInterval()
            this.attackStart()
        }
    }

    attackStart() {
        setInterval(() => {
            clearInterval(this.walk_interval)
            this.attackAnimation()
        }, this.attackLoop); //attacks every 7sec
    }

    attackAnimation() {
        this.attackIntervall = setInterval(() => {
            if (this.a < CHICKEN_BOSS_IMAGES.IMAGES_ATTACK.length && !this.dead) {
                this.playAttackAnimation()
            }
        }, 3000 / CHICKEN_BOSS_IMAGES.IMAGES_ATTACK.length);
        this.resetAttackAnimation()
    }

    playAttackAnimation() {
        this.a = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_ATTACK, this.a);
        if (this.a === 5 || this.a === 9 || this.a === 13 && !this.dead) {
            this.jumpAttack()
            this.clearJumpAttackIntervall()
        }
    }

    resetAttackAnimation() {
        if (!this.dead) {
            setTimeout(() => {
                clearInterval(this.attackIntervall)
                this.walkInterval()
            }, 3050);
        }
        this.a = 0
    }

    jumpAttack() {
        this.jumpAttackIntervall =
            setInterval(() => {
                this.attack()
                this.attackSound.play()
            }, 1000 / 30);
        this.speedY = this.jumpAtttackHight //12
    }

    attack() {
        if (this.otherDirection)
            this.attackRight()
        else
            this.attackLeft()
    }

    attackLeft() {
        this.x -= this.jumpAttackDistanz //12
    }

    attackRight() {
        this.x += this.jumpAttackDistanz //12
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
        }, world.character.CoolDownTime);
    }

    hurtAnimation() {
        this.setHurtAnimationIntervall()
        setTimeout(() => {
            clearInterval(this.hurtAnimationIntervall)
        }, world.character.CoolDownTime);
        this.h = 0
    }

    setHurtAnimationIntervall() {
        this.hurtAnimationIntervall = setInterval(() => {
            if (this.h < CHICKEN_BOSS_IMAGES.IMAGES_HURT.length && !this.dead) {
                this.playHurtAnimation()
            }
        }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_HURT.length);
    }

    playHurtAnimation() {
        this.h = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_HURT, this.h);
    }












}