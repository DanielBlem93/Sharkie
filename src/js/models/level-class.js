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
        this.setBackground()


    }

    playBackgroundSound(sounds) {
        setTimeout(() => {
            sounds.forEach(bgSound => {

                bgSound.loop = true
                bgSound.play()

            });
        }, 1000);

    }

    setVolume(value, sound) {
        sound.forEach(Sound => {
            Sound.volume = value
        })
        this.mainTheme.forEach(Sound => {
            Sound.volume = value
        })

    }

    setBackground() {

        for (let i = 0; i < levelLength; i++) {

            backgroundObjects.push(
                new BackgroundObject(BACKGROUND_IMAGES.air, 719 * i),
                new BackgroundObject(BACKGROUND_IMAGES.layer_3_img_1, 719 * i),
                new BackgroundObject(BACKGROUND_IMAGES.layer_2_img_1, 719 * i),
                new BackgroundObject(BACKGROUND_IMAGES.layer_1_img_1, 719 * i)
            );
            i++;
            backgroundObjects.push(
                new BackgroundObject(BACKGROUND_IMAGES.air, 719 * i),
                new BackgroundObject(BACKGROUND_IMAGES.layer_3_img_2, 719 * i),
                new BackgroundObject(BACKGROUND_IMAGES.layer_2_img_2, 719 * i),
                new BackgroundObject(BACKGROUND_IMAGES.layer_1_img_2, 719 * i)
            );
        }
    }

    spawnEnemies() {
        enemiesToSpawn.forEach(enemy => {
            this.enemies.push(enemy)
        });

    }
}

