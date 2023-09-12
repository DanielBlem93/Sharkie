class Chicken extends MovableObjekt {
    height = 100
    width = 80
    y = 330



    constructor() {
        super().loadImage(CHICKEN_IMAGES.IMAGES_WALKING[1])
        this.loadImages(CHICKEN_IMAGES.IMAGES_WALKING)

        this.x = 719 + Math.random() * 719 * levelLength;
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate()
    }

    animate() {

        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
    }
}