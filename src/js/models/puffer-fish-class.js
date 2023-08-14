class PufferFish extends MovableObjekt {


    constructor() {
        super().loadImage('src/img/2.Enemy/1.Puffer-fish/1.Swim/1.swim1.png')
        this.x = 100 + Math.random() * 150
    }
}