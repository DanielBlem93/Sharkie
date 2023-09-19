class ThrowableObject extends MovableObjekt {
  
    t = 0
    r = 0
    intervalId
    bottleOnGround = false

    constructor(x, y) {
        super().loadImage(THROWABLES_IMAGES.BOTTLE_IMAGES[1])
        this.loadImages(THROWABLES_IMAGES.BOTTLE_IMAGES)
        this.loadImages(THROWABLES_IMAGES.SPLASH_IMAGES)
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
        AUDIOS.throw_sound.play()
    }

    throw(direction) {
        this.speedY = 25
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
        world.bottlesBar.setBottles(10,'remove')
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
        if (world.bottlesBar.bottles <= 0) {
            return false
        } else {
            return true
        }

    }

    bottleCracking() {
        setInterval(() => {
            if (this.bottleOnGround) {
                if (this.t < THROWABLES_IMAGES.SPLASH_IMAGES.length) {
                    this.splashAnimation()
                    this.destroyBottle()
                    AUDIOS.bottleCracking_sound.play()
                }
            } else if (!this.bottleOnGround) {
                this.playAnimation(THROWABLES_IMAGES.BOTTLE_IMAGES)
            }
        }, 1000 / 8);
    }

    destroyBottle() {
        if (this.t >= THROWABLES_IMAGES.SPLASH_IMAGES.length)
            world.bottles.splice(0, 1)
    }

    splashAnimation() {
        this.t = this.animateImageOnce(THROWABLES_IMAGES.SPLASH_IMAGES, this.t);
    }

    rotateAnimation() {
        this.r = this.animateImageOnce(THROWABLES_IMAGES.BOTTLE_IMAGES, this.r);
    }







}