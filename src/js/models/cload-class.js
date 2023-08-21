class Cloud extends MovableObjekt {

    y = 0
    height = 300
    width = 500

    constructor() {
        super().loadImage(' src/img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 250
       this.animate();

    }

    animate(){
        setInterval(() => {
            this.x -= 0.15
        }, 1000/60);
    }
}