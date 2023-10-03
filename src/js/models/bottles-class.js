class Bottle extends CollectableObject {
    height = 100
    width = 100
    hitboxHeight = 45;
    hitboxWidth = 45;
    hitboxX = 35
    hitboxY = 25
    pickUpSound = AUDIOS.blop
    index = this.getRandomNumber(COLLACTABLES_IMAGES.bottles)
    constructor(x, y) {

        super()
        this.loadImage(COLLACTABLES_IMAGES.bottles[this.index])
        this.x = x
        this.y = y
    }



}