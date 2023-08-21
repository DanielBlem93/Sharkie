class Character extends MovableObjekt {

    IMAGES_WALKING =[
        'src/img/2_character_pepe/2_walk/W-21.png',
        'src/img/2_character_pepe/2_walk/W-22.png',
        'src/img/2_character_pepe/2_walk/W-23.png',
        'src/img/2_character_pepe/2_walk/W-24.png',
        'src/img/2_character_pepe/2_walk/W-25.png',
        'src/img/2_character_pepe/2_walk/W-26.png',
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('src/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)

        this.animate()
    }
    animate(){
        setInterval(() => {     
            let i = this.currentImage % this.IMAGES_WALKING.length;
            // 5 / 6
            let path = this.IMAGES_WALKING[i]
            this.img = this.imageCache[path]
            this.currentImage++
        }, 1000/10);
    }
    jump() {
        console.log('jump')
    }
}