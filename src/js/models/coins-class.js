class Coin extends CollectableObject {
    height = 150
    width = 150

    constructor(x,y) {
        super().loadImage(COLLACTABLES_IMAGES.coins[0])
        this.x =x
        this.y =y
    }
    

}