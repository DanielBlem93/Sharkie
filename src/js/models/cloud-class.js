class Cloud extends MovableObjekt {

    y = 0
    height = 300
    width = 500
    speed = 0.25


    constructor() {
        super().loadImage(BACKGROUND_IMAGES.cloud)
        this.x = Math.random() * 719 * levelLength
        this.animate();
  

    }

    animate() {
        this.animate_interval = setInterval(() => {
            this.moveLeft()
        }, 1000 / 30);
        intervals.push(this.animate_interval);
    }
}