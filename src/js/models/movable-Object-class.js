class MovableObjekt {
    x = 0;
    y = 0;
    img;
    height = 50;
    width = 50;

    loadImage(path) {
        this.img = new Image()
        this.img.src = path
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