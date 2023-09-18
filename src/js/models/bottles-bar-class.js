class BottlesBar extends StatusBar {



    bottles = 100

    constructor() {

        super()
        this.loadImages(STATUSBAR_IMAGES.BOTTLESBAR_IMAGES)
        this.y = 50
        this.setBottles(0)
    }

    setBottles(bottles) {
        this.bottles -= bottles
        this.changeBarValues(STATUSBAR_IMAGES.BOTTLESBAR_IMAGES, this.bottles)
    }

    checkBottleBar() {
        if (this.bottles <= 0) {
            return false
        } else {
            return true
        }
    }



}