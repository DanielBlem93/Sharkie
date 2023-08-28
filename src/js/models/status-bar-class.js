class StatusBar extends DrawableObject {
    STATUSBAR_IMAGES = [
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',


    ]

    health = 100

    constructor() {
        super()
        this.loadImages(this.STATUSBAR_IMAGES)
        this.x = 40
        this.y = 0
        this.width = 200
        this.height = 60
        this.setHealth(100)

    }


    setHealth(hp) {
        this.health = hp
        this.changeBarValues(this.STATUSBAR_IMAGES, this.health)
    }

    changeBarValues(arr, variable) {
        let path = arr[this.resolveIMageIndex(variable)]
        this.img = this.imageCache[path]
    }

    resolveIMageIndex(variable) {
        if (variable == 100) {
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