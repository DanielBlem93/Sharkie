class SoundControll extends Button {

    constructor(x, y, width, height, image) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImage(image);
    }




    onClick() {
        this.loadImage(MENU_IMAGES.audio_on)
    }


}