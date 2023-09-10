class Coinbar extends StatusBar {

    COINBAR_IMAGES = [
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',

    ]


    coins = 0

    constructor() {

        super()
        this.loadImages(this.COINBAR_IMAGES)
        this.y = 100
        this.setCoins(0)
    }

    setCoins(coins) {
        if (this.coins < 100) {
            this.coins += coins
        }

        this.changeBarValues(this.COINBAR_IMAGES, this.coins)
    }


}