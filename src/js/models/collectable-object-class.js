class CollectableObject extends MovableObjekt {
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


}