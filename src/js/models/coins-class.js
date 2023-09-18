class Coin extends CollectableObject {
    height = 150
    width = 150
    pickUpSound = AUDIOS.collect_coin

constructor(x, y) {

    super()
    this.loadImage(COLLACTABLES_IMAGES.coins[0])
    console.log(this)
    this.x = x
    this.y = y


}


}