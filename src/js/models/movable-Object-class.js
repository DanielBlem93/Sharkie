class MovableObjekt extends DrawableObject {

    speed = 0.15
    speedY = 1
    acceleration = 2.5
    otherDirection = false
    energy = 100
    lastHit = 0



    // 
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }
    hit() {

        this.energy -= 5
        
        if (this.energy < 0) {
            this.energy = 0
        }else{
            this.lastHit = new Date().getTime()
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit // differece in ms
        timepassed = timepassed / 1000 // difference in s
        world.statusBar.setHealth(this.energy)
   
        return timepassed < 1 
    }

    isDead() {
        return this.energy == 0
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 8%6 0> 1, Rest 1
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    applyGravity(gravityOn) {
        setInterval(() => {
            if (gravityOn.call(this) || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
          
            } else {
    
            }

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
