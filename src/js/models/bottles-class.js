class Bottle extends CollectableObject {
    height = 100
    width = 100
    pickUpSound = AUDIOS.blop
    index = this.getRandomNumber(COLLACTABLES_IMAGES.bottles)
    constructor(x, y) {

        super()
        this.loadImage(COLLACTABLES_IMAGES.bottles[this.index])
        console.log(this)
        this.x = x
        this.y = y
    }



}