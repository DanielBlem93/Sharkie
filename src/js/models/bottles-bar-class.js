class BottlesBar extends StatusBar {



    bottles = 20

    constructor() {

        super()
        this.loadImages(STATUSBAR_IMAGES.BOTTLESBAR_IMAGES)
        this.y = 50
        this.setBottles(0)
    }

    setBottles(amount, work) {
        switch (work) {
            case 'add':
                this.bottles += amount
                break;

            case 'remove':
                this.bottles -= amount
                break;
        }
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