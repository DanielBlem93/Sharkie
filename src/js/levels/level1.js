let levelLength = 4;

function setBackground() {

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

const level1 = new Level(

    [
        new Chicken(900),
        new BabyChicken(800),
        // new Chicken(2100),
        // new BabyChicken(2350),
        // new Chicken(2500),
        // new Chicken(2750),
        // new BabyChicken(2850),
        // new BabyChicken(4000),
        // new BabyChicken(4200),
        // new Chicken(4500),
        // new Chicken(5000),
        // new BabyChicken(5500),
        // new Chicken(7000),
        // new BabyChicken(8500),
        // new Chicken(9000),
        // new BabyChicken(9500),
        // new Chicken(10000),
        // new BabyChicken(10100),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new BabyChicken(),
        // new BabyChicken(),
        // new BabyChicken(),
        // new BabyChicken(),
        // new BabyChicken(),
        // new BabyChicken(),
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    backgroundObjects =
    [
        new BackgroundObject(BACKGROUND_IMAGES.air, -719),
        new BackgroundObject(BACKGROUND_IMAGES.layer_3_img_2, -719),
        new BackgroundObject(BACKGROUND_IMAGES.layer_2_img_2, -719),
        new BackgroundObject(BACKGROUND_IMAGES.layer_1_img_2, -719)
    ],
    [
        new Coin(550, 250),
        new Coin(650, 250),
        new Coin(750, 250),
        new Coin(1500, 150),
        new Coin(1600, 200),
        new Coin(1700, 250),
        new Coin(3300, 75),
        new Coin(3400, 75),
        new Coin(4700, 150),
        new Coin(4600, 200),
        new Coin(6000, 100),
        new Coin(6200, 125),
        new Coin(6400, 200),
        new Coin(8000, 75),
        new Coin(9500, 250),
        new Coin(10789, 75),
        new Coin(10789, 125),
        new Coin(10789, 175),
        new Coin(10789, 225),
        new Coin(10789, 275),


    ],
    [
        new Bottle(700, 340),
        new Bottle(1800, 330),
        new Bottle(3000, 350),
        new Bottle(3500, 350),
        new Bottle(4500, 350),
        new Bottle(5000, 340),
        new Bottle(6000, 340),
        new Bottle(7700, 330),
        new Bottle(9400, 340),
        new Bottle(9500, 340),
        new Bottle(9000, 330),
        new Bottle(10700, 330),
        new Bottle(10500, 330),
    ],
    [
        AUDIOS.wind,
        // AUDIOS.crickets
    ],
    [
        AUDIOS.theme_song
    ]

);
setBackground()