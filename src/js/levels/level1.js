const level1 = new Level(
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    clouds =
    [
        new Cloud(),
        new Cloud()
    ],
    backgroundObjects =
    [
        new BackgroundObject('src/img/5_background/layers/air.png', -719),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('src/img/5_background/layers/air.png', 0),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('src/img/5_background/layers/air.png', 719),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('src/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('src/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('src/img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('src/img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('src/img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/1.png', 719 * 6),

        new BackgroundObject('src/img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/2.png', 719 * 7),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/2.png', 719 * 7),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/2.png', 719 * 7),
    ],
    coins =
    [
        new Coin(300, 300),
        new Coin(350, 250),
        new Coin(400, 200),
    ],

   

    backgroundSounds =
    [
        wind = new Audio('src/audio/background_sound_wind.mp3'),
        crickets = new Audio('src/audio/crickets-sound.mp3'),
    ],

    mainTheme= [
        theme = new Audio('src/audio/light-salsa-song.mp3')
    ],

  




)