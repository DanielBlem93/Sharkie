class Chicken extends MovableObjekt {
    height = 100
    width = 80
    y = 330

    constructor() {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 200 + Math.random() * 500
    }
}