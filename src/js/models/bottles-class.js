class Bottle extends CollectableObject {
    height = 150
    width = 150
    pickUpSound = AUDIOS.blop
    constructor(x, y) {

        super()
        this.loadImage(COLLACTABLES_IMAGES.bottles[0])
        console.log(this)
        this.x = x
        this.y = y
    }



}