class Level{
    enemies;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 719*7

    constructor(enemmies, clouds, bgo, coins){
        this.enemies = enemmies
        this.clouds = clouds
        this.backgroundObjects = bgo
        this.coins = coins
    }
}