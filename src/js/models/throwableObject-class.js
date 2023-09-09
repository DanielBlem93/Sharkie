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
    r = 0
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
        } else if (world.character.otherDirection) {
            this.throw('left')
        }
    }

    throw(direction) {
        this.speedY = 35
        this.applyGravity(this.isBottleAboveGround)

        this.intervalId = setInterval(() => {

            if (direction === 'right') {
                this.throwRight()
            }

            else if (direction === 'left') {
                this.throwLeft()
            }

            this.checkBottleOnGround()

        }, 1000 / 60);

        this.bottleCracking()
        world.bottlesBar.setBottles(10)
    }

    throwRight() {
        this.x += 5
    }
    throwLeft() {
        this.x -= 5
    }

    checkBottleOnGround() {
        if (this.y >= 310) {
            this.bottleOnGround = true
            clearInterval(this.intervalId)
        }
    }
    checkBottleBar() {
        if (world.bottlesBar.bottles <=0) {
            return false
        } else {
            return true
        }

    }

    bottleCracking() {
        setInterval(() => {
            if (this.bottleOnGround) {
                if (this.t < this.SPLASH_IMAGES.length) {
                    this.splashAnimation()
                    this.destroyBottle()
                }
            } else if (!this.bottleOnGround) {
                this.playAnimation(this.BOTTLE_IMAGES)
            }
        }, 1000 / 8);
    }

    destroyBottle() {
        if (this.t >= this.SPLASH_IMAGES.length)
            world.bottles.splice(0, 1)
    }

    splashAnimation() {
        this.t = this.animateImageOnce(this.SPLASH_IMAGES, this.t);
    }

    rotateAnimation() {
        this.r = this.animateImageOnce(this.BOTTLE_IMAGES, this.r);
    }







}