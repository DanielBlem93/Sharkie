class MovableObjekt {
    x = 120;
    y = 135;
    img;
    height = 300;
    width = 150;
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

    moveRight() {
        this.x++
        console.log('move right')
    }
    moveLeft() {
        this.x--
        this.moveLeft('move left')
    }
} 