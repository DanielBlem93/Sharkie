class MovableObjekt extends DrawableObject {

    speed = 0.15
    speedY = 0
    acceleration = 2.5
    otherDirection = false
    energy = 100
    lastHit = 0
    godmode = false



    // 
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
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

        this.energy -= 49
        world.statusBar.setHealth(this.energy)

        if (this.energy <= 0) {
            this.energy = 0
            this.dead = true
        } else {
            this.lastHit = new Date().getTime()
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



    playDeathAnimation(deathImgArray) {

        let path = deathImgArray[this.j]
        this.img = this.imageCache[path]
        this.j++

    }

    playJumpAnimation(jumpImgArray) {
        let path = jumpImgArray[this.s]
        this.img = this.imageCache[path]
        this.s++
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
        return this.y < 331
    }

    jump() {
        this.speedY = 30
    }
    moveRight() {
        this.x += this.speed
    }
    moveLeft() {
        this.x -= this.speed
    }
}
