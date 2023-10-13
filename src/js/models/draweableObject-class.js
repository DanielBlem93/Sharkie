/**
 * Class representing a drawable object.
 */
class DrawableObject {

    /**
     * The x-coordinate of the drawable object.
     * @type {number}
     */
    x;

    /**
     * The y-coordinate of the drawable object.
     * @type {number}
     */
    y;

    /**
     * The height of the drawable object.
     * @type {number}
     */
    height = 300;

    /**
     * The width of the drawable object.
     * @type {number}
     */
    width = 150;

    /**
     * The height of the hitbox.
     * @type {number}
     */
    hitboxHeight;

    /**
     * The width of the hitbox.
     * @type {number}
     */
    hitboxWidth;

    /**
     * The x-coordinate of the hitbox.
     * @type {number}
     */
    hitboxX;

    /**
     * The y-coordinate of the hitbox.
     * @type {number}
     */
    hitboxY;

    /**
     * The image object associated with the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * The index of the current image (for animations).
     * @type {number}
     */
    currentImage = 0;

    /**
     * A cache for loaded images.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {

        this.img = new Image()
        this.img.src = path
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

    }

    /**
     * Draws the hitbox or frame of the object for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
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

        else if (this instanceof Button) {
            //show image size
            ctx.beginPath()
            ctx.lineWidth = '1'
            ctx.strokeStyle = 'blue'
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke()
        }
    }
    /**
        * Loads an array of images and caches them.
        * @param {string[]} arr - Array of image paths.
        */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img;
        })
    }
 /**
     * Flips the image horizontally.
     * @param {MovableObject} mo - The movable object associated with the drawable object.
     */
    flipImage(mo) {

        world.ctx.save();
        world.ctx.translate(mo.width, 0)
        world.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }

    /**
     * Reverts the horizontal flipping of the image.
     * @param {MovableObject} mo - The movable object associated with the drawable object.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1
        world.ctx.restore()
    }
 /**
     * Generates a random number within the index range of an array.
     * @param {any[]} array - The input array.
     * @returns {number} - A random index.
     */
    getRandomNumber(array) {
        let index = array.length - 1
        return Math.round(Math.random() * index);
    }
}



