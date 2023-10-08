class Menu extends DrawableObject {
    x = 20
    y = 0
    width = 720;
    height = 480;
    buttons = []
    hideMenu = false
    startButton
    replayButton





    constructor(x, y, width, height, image) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.startButton = new Start_button(270, 25, 200, 80, MENU_IMAGES.start_game_button);//x,y,width,height,img
        this.loadImage(image);
        this.pushButtons(this.startButton)
    }

    pushButtons(btn) {
        this.buttons.push(btn)
    }






}

