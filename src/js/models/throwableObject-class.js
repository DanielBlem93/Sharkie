class ThrowableObject extends MovableObjekt {
    BOTTLE_IMAGES = [
        'src/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]




    constructor(x, y) {
        super().loadImage('src/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.x = x
        this.y = y
        this.width = 70
        this.height = 80
        this.throw()
    }

    throw() {
     
        this.speedY = 20
        this.applyGravity(this.isBottleAboveGround)
        setInterval(() => {
            this.x += 30
        }, 60);
    }



}