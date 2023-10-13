/**
 * Class representing a collectable object.
 * Extends the DrawableObject class.
 */
class CollectableObject extends DrawableObject {

    /**
     * The height of the collectable object.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the collectable object.
     * @type {number}
     */
    width = 150;

    /**
     * The sound played when the object is picked up.
     * @type {Audio}
     */
    pickUpSound;

    /**
     * Constructor for creating a CollectableObject.
     * Calls the constructor of the parent class (DrawableObject).
     */
    constructor() {
        super();
    }

    /**
     * Plays the pick up sound of the collectable object.
     */
    playPickUpSound() {
        const PickUpSoundClone = new Audio(this.pickUpSound.src); // Clone the audio file
        PickUpSoundClone.volume = this.pickUpSound.volume; // Set the volume
        PickUpSoundClone.play(); // Play the sound
    }

    /**
     * Collects the item at the specified index in the world's CollectableObjects array.
     * Updates relevant status bars and plays the pick up sound.
     * @param {number} index - The index of the collectable object in the array.
     */
    collectItem(index) {
        if (world.CollectableObjects[index] instanceof Coin){
            world.coinBar.setCoins(5);
        } else if(world.CollectableObjects[index] instanceof Bottle){
            world.bottlesBar.setBottles(10, 'add');
        }
        world.CollectableObjects[index].playPickUpSound();
        world.CollectableObjects.splice(index, 1);
    }
}
