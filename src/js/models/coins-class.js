class Coin extends CollectableObject {
    height = 150
    width = 150
    hitboxHeight = 45;
    hitboxWidth = 45;
    hitboxX = 52
    hitboxY = 52
    pickUpSound = AUDIOS.collect_coin

    constructor(x, y) {

        super()
        this.loadImage(COLLACTABLES_IMAGES.coins[0])
        this.x = x
        this.y = y


    }


}