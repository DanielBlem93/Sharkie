class BabyChicken extends MovableObjekt {

    height = 50
    width = 50
    hitboxHeight = 25;
    hitboxWidth = 35;
    hitboxX = 10
    hitboxY = 7.5
    y = 360
    hp = 10
    demage = 10
    sound = AUDIOS.babyChicken


    constructor() {
        super()
        this.loadImage(BABY_CHICKEN_IMAGES.IMAGES_WALKING[0])
        this.loadImages(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        this.animate()
        this.x = 400 + Math.random() * 719 * levelLength;
    }


    animate() {

        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);

        this.walk_interval = setInterval(() => {
            this.playAnimation(BABY_CHICKEN_IMAGES.IMAGES_WALKING)
        }, 1000 / 10);
    }












}


