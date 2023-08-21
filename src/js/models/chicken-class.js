class Chicken extends MovableObjekt {


    constructor() {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 100 + Math.random() * 150
    }
}