class Coinbar extends StatusBar {



    coins = 0

    constructor() {

        super()
        this.loadImages(STATUSBAR_IMAGES.COINBAR_IMAGES)
        this.y = 100
        this.setCoins(0)
    }

    setCoins(coins) {
        if (this.coins < 100) {
            this.coins += coins
        }

        this.changeBarValues(STATUSBAR_IMAGES.COINBAR_IMAGES, this.coins)
    }


}