class Level {
    enemies;
    clouds;
    coins;
    backgroundObjects;
    backgroundSounds
    mainTheme
    level_end_x = 719 * 7

    constructor(enemmies, clouds, bgo, coins, bgSound,mainTheme) {
        this.enemies = enemmies
        this.clouds = clouds
        this.backgroundObjects = bgo
        this.coins = coins
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

    setVolume(value,sound) {
        sound.forEach(Sound => {
            Sound.volume = value
        })
        this.mainTheme.forEach(Sound => {
            Sound.volume = value
        })

    }
}