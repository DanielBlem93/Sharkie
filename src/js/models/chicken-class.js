class Chicken extends MovableObjekt {
    height = 100
    width = 80
    y = 330
    IMAGES_WALKING = [
        'src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]


    constructor() {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate()
    }

    animate() {
        this.moveLeft()
        
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            // 5 / 6
            let path = this.IMAGES_WALKING[i]
            this.img = this.imageCache[path]
            this.currentImage++
        }, 1000 / 6);
    }
}