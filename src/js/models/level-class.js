class Level {
    enemies;
    clouds;
    coins;
    bottles_coll;
    backgroundObjects;
    backgroundSounds
    mainTheme
    level_end_x = 719 * (levelLength - 1)

    constructor(enemmies, clouds, bgo, coins, bottles_coll, bgSound, mainTheme,) {
        this.enemies = enemmies
        this.clouds = clouds
        this.backgroundObjects = bgo
        this.coins = coins
        this.bottles_coll = bottles_coll
        this.backgroundSounds = bgSound
        this.mainTheme = mainTheme
        this.playBackgroundSound(bgSound)
        this.playBackgroundSound(mainTheme)

    }

    playBackgroundSound(sounds) {

        sounds.forEach(bgSound => {

            bgSound.loop = true
            bgSound.play()

        });
    }

    setVolume(value, sound) {
        sound.forEach(Sound => {
            Sound.volume = value
        })
        this.mainTheme.forEach(Sound => {
            Sound.volume = value
        })

    }
}