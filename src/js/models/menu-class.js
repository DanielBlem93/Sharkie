class Menu extends DrawableObject {
    buttons = []
    startButton

    constructor() {
        super();
        this.x = 20;
        this.y = 0;
        this.width = 720;
        this.height = 480;
        this.startButton = new Button(260, 25, 200, 80, MENU_IMAGES.start_game_button);//x,y,width,height,img
        this.loadImage(MENU_IMAGES.main_menu);
        this.pushButtons(this.startButton)
    }

    pushButtons(btn) {
        this.buttons.push(btn)
    }


}