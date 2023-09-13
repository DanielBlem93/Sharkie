class Coin extends CollectableObject {
    height = 150
    width = 150
    collect_coin = AUDIOS.collect_coin

    constructor(x, y) {
        super().loadImage(COLLACTABLES_IMAGES.coins[0])
        this.x = x
        this.y = y

    }
playCoinSound(){
    const coinSoundClone = new Audio(this.collect_coin.src); // Klonen der Audiodatei
        coinSoundClone.volume = this.collect_coin.volume; // Übernahme der Lautstärke
        coinSoundClone.play();
}

}