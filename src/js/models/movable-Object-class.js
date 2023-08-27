class MovableObjekt {
    x = 120;
    y = 135;
    height = 300;
    width = 150;
    img;
    currentImage = 0;
    speed = 0.15
    speedY = 0
    acceleration = 2.5
    otherDirection = false
    energy = 100
    imageCache = {};

    loadImage(path) {

        this.img = new Image()
        this.img.src = path
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath()
            ctx.lineWidth = '5'
            ctx.strokeStyle = 'blue'
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke()
        }
    }
    // 
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 8%6 0> 1, Rest 1
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
                this.CharacterOnGround = false
            } else {
                this.CharacterOnGround = true
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 135
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
