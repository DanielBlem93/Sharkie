/**
 * Represents a Button, a type of DrawableObject.
 * @extends DrawableObject
 */
class Button extends DrawableObject {

    /**
     * Creates an instance of Button.
     */
    constructor() {
        super();
    }

    /**
     * Checks if the button is clicked based on mouse coordinates.
     * @param {number} mouseX - The x-coordinate of the mouse click.
     * @param {number} mouseY - The y-coordinate of the mouse click.
     * @returns {boolean} - Returns true if the button is clicked, otherwise false.
     */
    isClicked(mouseX, mouseY) {
        mouseX += (this.x - this.width - 40);
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }

    


   
}
