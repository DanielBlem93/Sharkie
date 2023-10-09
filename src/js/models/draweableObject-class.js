class DrawableObject {
    x = 50;
    y = 50;
    height = 300;
    width = 150;
    hitboxHeight = 50;
    hitboxWidth = 50;
    hitboxX = 50
    hitboxY = 50
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
    //showHitbox
    drawFrame(ctx) {
        if (this instanceof MovableObjekt || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {

            const hitboxX = this.x + this.hitboxX
            const hitboxY = this.y + this.hitboxY

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(hitboxX, hitboxY, this.hitboxWidth, this.hitboxHeight);
            ctx.stroke();
        }
         
        // else if (this instanceof Button) {
        //     //show image size
        //     ctx.beginPath()
        //     ctx.lineWidth = '5'
        //     ctx.strokeStyle = 'blue'
        //     ctx.rect(this.x, this.y, this.width, this.height)
        //     ctx.stroke()
        // }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img;
        })
    }

    flipImage(mo) {

        world.ctx.save();
        world.ctx.translate(mo.width, 0)
        world.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        world.ctx.restore()
    }

    getRandomNumber(array) {
        let index = array.length - 1
        return Math.round(Math.random() * index);
    }
}



