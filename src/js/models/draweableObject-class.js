class DrawableObject  {
    x = 50;
    y = 50;
    height = 300;
    width = 150;
    img;
    currentImage = 0;
    imageCache = {};

    loadImage(path) {

        this.img = new Image()
        this.img.src = path
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath()
            ctx.lineWidth = '5'
            ctx.strokeStyle = 'blue'
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke()
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img;
        })
    }
}


