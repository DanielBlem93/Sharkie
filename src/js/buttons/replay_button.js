class Replay_button extends Button {

    constructor(x, y, width, height, image) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImage(image);
    }




    onClick() {
        this.restartGame()
    }



    restartGame() {
        console.log('restart game')

       
    }
}