class Button extends DrawableObject {


    constructor() {
        super();
    }



    isClicked(mouseX, mouseY) {
        mouseX += (this.x - this.width-40)
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }
}







