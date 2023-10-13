/**
 * Represents a game level.
 * @class
 */
class Level {
    /**
     * Array of enemies in the level.
     * @type {Enemy[]}
     */
    enemies;

    /**
     * Array of clouds in the level.
     * @type {Cloud[]}
     */
    clouds;

    /**
     * Array of coins in the level.
     * @type {Coin[]}
     */
    coins;

    /**
     * Array of collectible bottles in the level.
     * @type {Bottle[]}
     */
    bottles_coll;

    /**
     * Array of background objects in the level.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;

    /**
     * Array of background sounds in the level.
     * @type {Audio[]}
     */
    backgroundSounds;

    /**
     * Array of main theme sounds in the level.
     * @type {Audio[]}
     */
    mainTheme;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x;

    /**
     * Creates an instance of Level.
     * @param {Enemy[]} enemmies - Array of enemies in the level.
     * @param {Cloud[]} clouds - Array of clouds in the level.
     * @param {BackgroundObject[]} bgo - Array of background objects in the level.
     * @param {Coin[]} coins - Array of coins in the level.
     * @param {Bottle[]} bottles_coll - Array of collectible bottles in the level.
     * @param {Audio[]} bgSound - Array of background sounds in the level.
     * @param {Audio[]} mainTheme - Array of main theme sounds in the level.
     */
    constructor(enemmies, clouds, bgo, coins, bottles_coll, bgSound, mainTheme) {
        this.enemies = enemmies;
        this.clouds = clouds;
        this.backgroundObjects = bgo;
        this.coins = coins;
        this.bottles_coll = bottles_coll;
        this.backgroundSounds = bgSound;
        this.mainTheme = mainTheme;
        this.level_end_x = 719 * (levelLength - 1);
        this.setBackground();
    }

    /**
     * Plays background sounds with a delay.
     * @param {Audio[]} sounds - Array of Audio objects.
     */
    playBackgroundSound(sounds) {
        setTimeout(() => {
            sounds.forEach(bgSound => {
                bgSound.loop = true;
                bgSound.play();
            });
        }, 1000);
    }

    /**
     * Sets the volume of the provided sounds.
     * @param {number} value - The volume level (0 to 1).
     * @param {Audio[]} sounds - Array of Audio objects.
     */
    setVolume(value, sounds) {
        sounds.forEach(sound => {
            sound.volume = value;
        });
        this.mainTheme.forEach(sound => {
            sound.volume = value;
        });
    }

    /**
     * Sets the background objects for the level.
     */
    setBackground() {
        for (let i = 0; i < levelLength; i++) {
            this.backgroundObjects1(i);
            i++;
            this.backgroundObjects2(i);
        }
    }

    /**
     * Adds background objects to the level.
     * @param {number} i - Index for positioning.
     */
    backgroundObjects1(i) {
        backgroundObjects.push(
            new BackgroundObject(BACKGROUND_IMAGES.air, 719 * i),
            new BackgroundObject(BACKGROUND_IMAGES.layer_3_img_1, 719 * i),
            new BackgroundObject(BACKGROUND_IMAGES.layer_2_img_1, 719 * i),
            new BackgroundObject(BACKGROUND_IMAGES.layer_1_img_1, 719 * i)
        );
    }

    /**
     * Adds background objects to the level.
     * @param {number} i - Index for positioning.
     */
    backgroundObjects2(i) {
        backgroundObjects.push(
            new BackgroundObject(BACKGROUND_IMAGES.air, 719 * i),
            new BackgroundObject(BACKGROUND_IMAGES.layer_3_img_2, 719 * i),
            new BackgroundObject(BACKGROUND_IMAGES.layer_2_img_2, 719 * i),
            new BackgroundObject(BACKGROUND_IMAGES.layer_1_img_2, 719 * i)
        );
    }

    /**
     * Spawns enemies in the level and starts playing background sounds.
     */
    spawnEnemies() {
        enemiesToSpawn.forEach(enemy => {
            this.enemies.push(enemy);
        });
        this.playBackgroundSound(this.backgroundSounds);
        this.playBackgroundSound(this.mainTheme);
        AUDIOS.title_song.pause();
    }
}
