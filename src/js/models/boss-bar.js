class StatusBar extends DrawableObject {


    health = 100

    constructor() {
        super()
        this.loadImages(STATUSBAR_IMAGES.HEALTHBAR_IMAGES)
        this.x = 40
        this.y = 0
        this.width = 200
        this.height = 60
        this.setHealth(this.health)

    }


    setHealth(hp) {
        this.health = hp
        this.changeBarValues(STATUSBAR_IMAGES.HEALTHBAR_IMAGES, this.health)
    }

    changeBarValues(arr, variable) {
        let path = arr[this.resolveIMageIndex(variable)]
        this.img = this.imageCache[path]
    }

    resolveIMageIndex(variable) {
        if (variable >= 100) {
            return 0
        }
        else if (variable >= 80) {
            return 1
        }
        else if (variable >= 60) {
            return 2
        }
        else if (variable >= 40) {
            return 3
        }
        else if (variable >= 20) {
            return 4
        }

        else {
            return 5

        }

    }








}