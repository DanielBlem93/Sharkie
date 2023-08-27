class StatusBar extends DrawableObject {
    STATUSBAR_IMAGES = [
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',


    ]

    percentage = 100

    constructor() {
        super()
        this.loadImages(this.STATUSBAR_IMAGES)
        this.x = 40
        this.y = 0
        this.width = 200
        this.height = 50
        this.setPercentage(100)

    }


    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.STATUSBAR_IMAGES[this.resolveIMageIndex()]
        this.img = this.imageCache[path]


    }

    resolveIMageIndex() {
        if (this.percentage == 100) {
            return 0
        }
        else if (this.percentage > 80) {
            return 1
        }
        else if (this.percentage > 60) {
            return 2
        }
        else if (this.percentage > 40) {
            return 3
        }
        else if (this.percentage > 20) {
            return 4
        }
        else if (this.percentage == 0) {
            return 5
        }

    }








}