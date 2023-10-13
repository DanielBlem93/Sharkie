/**
 * Class representing an end boss.
 * @extends MovableObjekt
 */
class Endboss extends MovableObjekt {

    /**
     * The height of the end boss.
     * @type {number}
     */
    height = 500;

    /**
     * The width of the end boss.
     * @type {number}
     */
    width = 300;

    /**
     * The y-coordinate of the end boss.
     * @type {number}
     */
    y = -40;

    /**
     * The height of the hitbox.
     * @type {number}
     */
    hitboxHeight = 250;

    /**
     * The width of the hitbox.
     * @type {number}
     */
    hitboxWidth = 200;

    /**
     * The x-coordinate of the hitbox.
     * @type {number}
     */
    hitboxX = 65;

    /**
     * The y-coordinate of the hitbox.
     * @type {number}
     */
    hitboxY = 100;

    /**
     * The hit points of the end boss.
     * @type {number}
     */
    hp = 100;

    /**
     * The damage dealt by the end boss.
     * @type {number}
     */
    demage = 30;

    /**
     * The height of the jump attack.
     * @type {number}
     */
    jumpAtttackHight = 12;

    /**
     * The distance of the jump attack.
     * @type {number}
     */
    jumpAttackDistanz = 12;

    /**
     * The time interval for attacks.
     * @type {number}
     */
    attackLoop = 5000;

    /**
     * Indicates if the boss is active.
     * @type {boolean}
     */
    bossAktive = false;

    /**
     * Indicates if the intro animation is playing.
     * @type {boolean}
     */
    introAnimation = false;

    /**
     * Internal variables for animations.
     * @type {number}
     */
    a = 0;
    d = 0;
    h = 0;
    al = 0;

    /**
     * Interval for hurt animation.
     * @type {number}
     */
    hurtAnimationIntervall;

    /**
     * Interval for attack animation.
     * @type {number}
     */
    attackIntervall;

    /**
     * Interval for jump attack animation.
     * @type {number}
     */
    jumpAttackIntervall;

    /**
     * Interval for alert animation.
     * @type {number}
     */
    alertIntervall;

    /**
     * The sound played by the end boss.
     * @type {HTMLAudioElement}
     */
    sound = AUDIOS.BOSS_CHICKEN_SOUND;

    /**
     * The sound played when the end boss dies.
     * @type {HTMLAudioElement}
     */
    deadSound = AUDIOS.BOSS_CHICKEN_DEAD_SOUND;

    /**
     * The sound played during the end boss attack.
     * @type {HTMLAudioElement}
     */
    attackSound = AUDIOS.BOSS_CHICKEN_ATTACK_SOUND;

    /**
     * The music played during the end boss battle.
     * @type {HTMLAudioElement}
     */
    bossMusic = AUDIOS.boss_song;

    /**
     * Creates an instance of Endboss.
     */
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
        this.speed = 1
    }
    /**
     * Checks if the boss is above ground level.
     * @returns {boolean} True if above ground, false otherwise.
     */
    isBossAboveGround() {
        return this.y < -40
    }
    /**
     * Animates the end boss.
     */
    animate() {

        this.setAnimateInterval()
        this.walkInterval()
        this.dieing()

    }
    /**
     * Sets the animation interval for the end boss.
     */
    setAnimateInterval() {
        let animate_interval = setInterval(() => {
            this.walk()
            this.isDead()
            this.alert()
            setTimeout(() => {
                this.checkBossHp()
            }, 10000);
        }, 1000 / 30);
        intervals.push(animate_interval)
    }
    /**
     * Makes the end boss walk.
     */
    walk() {
        if (this.otherDirection)
            this.moveRight()
        else
            this.moveLeft()
    }
    /**
     * Checks if the end boss is dead.
     */
    isDead() {
        if (this.hp === 0) {
            this.dead = true
            this.disableBoss()
            setTimeout(() => {
                gameWon = true
                tastaturGesperrt = true
                allFalse()
            }, 1500);

        }
    }
    /**
     * Performs the alert animation for the end boss.
     */
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
    /**
     * Checks the HP of the end boss.
     */
    checkBossHp() {
        if (gameStart) {
            world.bossBar.setHealth(this.hp)
        }

    }
    /**
     * Sets the walking interval for the end boss.
     */
    walkInterval() {
        this.speed = 0.25
        this.walk_interval =
            setInterval(() => {
                this.playAnimation(CHICKEN_BOSS_IMAGES.IMAGES_WALKING)
                this.moveLeft()
            }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_WALKING.length);
    }
    /**
     * Handles the dying animation of the end boss.
     */
    dieing() {
        let die_interval = setInterval(() => {
            if (this.dead) {
                if (this.d < CHICKEN_BOSS_IMAGES.IMAGES_DEAD.length) {
                    this.playDeathAnimation()
                    this.clearJumpAttackIntervall()
                }
            }
        }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_DEAD.length);
        intervals.push(die_interval);
    }
    /**
     * Disables the end boss.
     */
    disableBoss() {
        this.speed = 0
        this.demage = 0
        this.sound.pause()
        this.deadSound.play()
        clearInterval(this.walk_interval)
        setTimeout(() => { this.stopChickenSound() }, 2500);
        setTimeout(() => { this.removeFromWorld(); }, 3000);
    }
    /**
     * Plays the boss music.
     */
    playBossMusic() {
        AUDIOS.theme_song.pause()
        this.bossMusic.play()
    }
    /**
     * Sets the alert interval for the end boss.
     */
    setAlertIntervall() {
        this.alertIntervall =
            setInterval(() => {
                if (this.al < CHICKEN_BOSS_IMAGES.IMAGES_ALERT.length) {
                    this.alertAnimation()
                }
            }, 1500 / CHICKEN_BOSS_IMAGES.IMAGES_ALERT.length);
        intervals.push(this.alertIntervall);
    }
    /**
     * Shows the HP of the end boss.
     */
    showBossHp() {
        world.bossBar.y = world.bossBar.defaultY
        world.bossBarIcon.y = world.bossBarIcon.defaultY
    }
    /**
     * Plays the death animation for the end boss.
     */
    playDeathAnimation() {
        this.d = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_DEAD, this.d);
    }
    /**
     * Clears the jump attack interval.
     */
    clearJumpAttackIntervall() {
        setTimeout(() => {
            this.attackSound.pause()
            this.attackSound.currentTime = 0
            clearInterval(this.jumpAttackIntervall)
        }, 700);
    }
    /**
     * Performs the alert animation for the end boss.
     */
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
    /**
     * Starts the attack sequence for the end boss.
     */
    attackStart() {
        let attack_loop_interval = setInterval(() => {
            clearInterval(this.walk_interval)
            this.attackAnimation()
        }, this.attackLoop); //attacks every 7sec
        intervals.push(attack_loop_interval);
    }
    /**
     * Performs the attack animation for the end boss.
     */
    attackAnimation() {
        this.attackIntervall = setInterval(() => {
            if (this.a < CHICKEN_BOSS_IMAGES.IMAGES_ATTACK.length && !this.dead) {
                this.playAttackAnimation()
            }
        }, 3000 / CHICKEN_BOSS_IMAGES.IMAGES_ATTACK.length);
        this.resetAttackAnimation()
    }
    /**
     * Plays the attack animation for the end boss.
     */
    playAttackAnimation() {
        this.a = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_ATTACK, this.a);
        if (this.a === 5 || this.a === 9 || this.a === 13 && !this.dead) {
            this.jumpAttack()
            this.clearJumpAttackIntervall()
        }
    }
    /**
     * Resets the attack animation for the end boss.
     */
    resetAttackAnimation() {
        if (!this.dead) {
            setTimeout(() => {
                clearInterval(this.attackIntervall)
                this.walkInterval()
            }, 3050);
        }
        this.a = 0
    }
    /**
     * Initiates the jump attack for the end boss.
     */
    jumpAttack() {
        this.jumpAttackIntervall =
            setInterval(() => {
                this.attack()
                this.attackSound.play()
            }, 1000 / 30);
        this.speedY = this.jumpAtttackHight //12
    }
    /**
     * Handles the attack movement for the end boss.
     */
    attack() {
        if (this.otherDirection)
            this.attackRight()
        else
            this.attackLeft()
    }
    /**
     * Moves the end boss to the left during an attack.
     */
    attackLeft() {
        this.x -= this.jumpAttackDistanz //12
    }
    /**
     * Moves the end boss to the right during an attack.
     */
    attackRight() {
        this.x += this.jumpAttackDistanz //12
    }
    /**
     * Handles the hurt action for the end boss.
     */
    hurt() {
        this.bossGodMode()
        this.hurtAnimation()
        AUDIOS.BOSS_CHICKEN_HURT_SOUND.play()
        AUDIOS.BOSS_CHICKEN_WINGS.play()
    }
    /**
     * Initiates the god mode for the end boss after being hurt.
     */
    bossGodMode() {
        this.sperre = true
        setTimeout(() => {
            this.sperre = false
        }, world.character.CoolDownTime);
    }
    /**
     * Initiates the hurt animation for the end boss.
     */
    hurtAnimation() {
        this.setHurtAnimationIntervall()
        setTimeout(() => {
            clearInterval(this.hurtAnimationIntervall)
        }, world.character.CoolDownTime);
        this.h = 0
    }

    /**
     * Sets the hurt animation interval for the end boss.
     */
    setHurtAnimationIntervall() {
        this.hurtAnimationIntervall = setInterval(() => {
            if (this.h < CHICKEN_BOSS_IMAGES.IMAGES_HURT.length && !this.dead) {
                this.playHurtAnimation()
            }
        }, 1000 / CHICKEN_BOSS_IMAGES.IMAGES_HURT.length);
    }

    /**
     * Plays the hurt animation for the end boss.
     */
    playHurtAnimation() {
        this.h = this.animateImageOnce(CHICKEN_BOSS_IMAGES.IMAGES_HURT, this.h);
    }












}