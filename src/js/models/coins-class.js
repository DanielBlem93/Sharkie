class Coin extends CollectableObject {
    height = 150
    width = 150

    constructor(x,y) {
        super().loadImage('src/img/8_coin/coin_1.png')
        this.x =x
        this.y =y
    }
    

}