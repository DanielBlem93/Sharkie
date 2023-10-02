class Bossbar extends StatusBar {

    defaultX = 260
    defaultY = 419

    health = 100

    constructor() {

        super()

        this.loadImages(STATUSBAR_IMAGES.HEALTHBAR_IMAGES)
        this.x = 260
        this.y = 479
        this.width = 200
        this.height = 60

    }

}