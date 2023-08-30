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
        
        this.x = 500 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate()
    }

    animate() {

         setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);
    
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 1000 / 10);
    }
}