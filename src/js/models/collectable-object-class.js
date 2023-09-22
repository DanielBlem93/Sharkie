class CollectableObject extends DrawableObject {
    height = 150
    width = 150
    pickUpSound

    constructor() {
        super()
    }

    playPickUpSound() {
        const PickUpSoundClone = new Audio(this.pickUpSound.src); // Klonen der Audiodatei
        PickUpSoundClone.volume = this.pickUpSound.volume; // Übernahme der Lautstärke
        PickUpSoundClone.play();
    }

    collectItem(index) {
        if (world.CollectableObjects[index] instanceof Coin){
            world.coinBar.setCoins(5)
        }else if(world.CollectableObjects[index] instanceof Bottle){
            world.bottlesBar.setBottles(10,'add')
        }
           
        world.CollectableObjects[index].playPickUpSound()
        world.CollectableObjects.splice(index, 1);
    }

    


}