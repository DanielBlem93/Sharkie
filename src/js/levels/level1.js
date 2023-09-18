let levelLength = 8;

function setBackground() {
    backgroundObjects.push();
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
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
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
        new Coin(300, 300),
        new Coin(350, 250),
        new Coin(400, 200)
    ],
    [
        new Bottle(300, 300),
        new Bottle(400, 300),
        new Bottle(500, 300),
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