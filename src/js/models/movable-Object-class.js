class MovableObjekt extends DrawableObject {

    speed = 0.15
    speedY = 0
    jumpPower = 27
    acceleration = 2
    otherDirection = false
    energy = 100
    lastHit = 0
    godmode = false



    // 
    isColliding(mo) {
        return this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height &&
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y;
    }
    hit() {

        if (this.godmode) {
            console.log('No damge takden, Godmode on')
        } else {
            this.takingDamge();
            this.godmodeON();
        }
    }
    godmodeON() {

        this.godmode = true
        setTimeout(() => {
            this.godmode = false
            this.loadImage('src/img/2_character_pepe/2_walk/W-21.png')
        }, 1000);

    }

    takingDamge() {

        this.energy -= 10
        world.statusBar.setHealth(this.energy)

        if (this.energy <= 0) {
            this.energy = 0
            this.dead = true
        } else {
            this.lastHit = new Date().getTime()
            lastKeyPressTime = this.lastHit
            world.character.playHurtSound()
        }
    }

    isHurt() {

        let timepassed = new Date().getTime() - this.lastHit // differece in ms
        timepassed = timepassed / 1000 // difference in s

        return timepassed < 1
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 8%6 0> 1, Rest 2
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    animateImageOnce(imagesArray, currentIndex) {
        let path = imagesArray[currentIndex];
        this.img = this.imageCache[path];
        currentIndex++;
        return currentIndex;
    }

    playJumpAnimation(jumpImgArray) {
        let animation;
        animation = setInterval(() => {
            if (this.s >= jumpImgArray.length) {

                clearInterval(animation); // Animation nach 9 Durchläufen stoppen
                this.s = 0;
                this.jumped = false


            } else {
                let path = jumpImgArray[this.s];
                this.img = this.imageCache[path];
                if (this.s === jumpImgArray.length - 2)
                AUDIOS.jump_landing_sound.play()

                    this.s++;
            }
        }, 1000 / 7);
    }

    applyGravity(gravityOn) {
        setInterval(() => {
            if (gravityOn.call(this) || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
            } else { }
        }, 1000 / 25);
    }

    isCharacterAboveGround() {
        return this.y < 135
    }
    isBottleAboveGround() {

        return this.y < 350
    }

    jump() {
        if (!this.jumped) {
            AUDIOS.jumping_sound.play()
            this.jumped = true
            setTimeout(() => {
                this.speedY = this.jumpPower
            }, 10);
        }
    }
    moveRight() {
        this.x += this.speed
    }
    moveLeft() {
        this.x -= this.speed
    }
}
