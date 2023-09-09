class ThrowableObject extends MovableObjekt {
    BOTTLE_IMAGES = [
        'src/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    SPLASH_IMAGES = [
        'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    t = 0
    intervalId
    bottleOnGround = false

    constructor(x, y) {
        super().loadImage('src/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.BOTTLE_IMAGES)
        this.loadImages(this.SPLASH_IMAGES)
        this.x = x
        this.y = y
        this.width = 70
        this.height = 80
        this.throwInDirection()

    }

    throwInDirection() {
        if (!world.character.otherDirection) {
            this.throw('right')
        } else {
            this.throw('left')
        }
    }

    throw(direction) {
        this.speedY = 20
        this.applyGravity(this.isBottleAboveGround)

        this.intervalId = setInterval(() => {

            if (direction === 'right') {
                this.throwRight()
            }

            else if (direction === 'left') {
                this.throwLeft()
            }

            this.checkBottle()

        }, 1000 / 60);

        this.bottleCracking()
    }

    throwRight() {
        this.x += 5
    }
    throwLeft() {
        this.x -= 5
    }

    bottleCracking() {
        setInterval(() => {
            if (this.bottleOnGround) {
                if (this.t < this.SPLASH_IMAGES.length) {
                    this.splashAnimation()
                    this.destroyBottle()
                }
            }
        }, 1000 / 7);
    }

    splashAnimation() {
        let path = this.SPLASH_IMAGES[this.t]
        this.img = this.imageCache[path]
        this.t++
    }

    destroyBottle() {
        if (this.t >= this.SPLASH_IMAGES.length)
            world.bottles.splice(0, 1)
    }

    checkBottle() {
        if (this.y >= 300) {
            this.bottleOnGround = true
            clearInterval(this.intervalId)
        }
    }



}