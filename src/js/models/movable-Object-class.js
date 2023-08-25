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
        this.x++
        console.log('move right')
    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed
        }, 1000 / 60);
    }
}
