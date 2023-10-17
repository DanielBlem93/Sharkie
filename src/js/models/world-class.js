/**
 * Represents the game world.
 */
class World {
    /**
     * The character in the world.
     * @type {Character}
     */
    character = new Character();
    /**
     * The canvas element for rendering.
     * @type {HTMLCanvasElement}
     */
    canvas;
    /**
     * The canvas rendering context.
     * @type {CanvasRenderingContext2D}
     */
    ctx;
    /**
     * The keyboard input for controlling the game.
     * @type {Keyboard}
     */
    keyboard;
    /**
     * The x-coordinate of the camera.
     * @type {number}
     */
    camera_x = 0;
    /**
     * The menu for the game.
     * @type {Menu}
     */
    menu = new Menu(20, 0, 720, 500, MENU_IMAGES.main_menu);
    /**
     * The game over screen.
     * @type {GameOverScreen}
     */
    gameOverScreen;
    /**
     * The game won screen.
     * @type {GameWonScreen}
     */
    gameWonScreen;
    /**
     * The status bar displaying health.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();
    /**
     * The coin bar displaying collected coins.
     * @type {Coinbar}
     */
    coinBar = new Coinbar();
    /**
     * The bottles bar displaying available bottles.
     * @type {BottlesBar}
     */
    bottlesBar = new BottlesBar();
    /**
     * The boss bar for end boss.
     * @type {Bossbar}
     */
    bossBar = new Bossbar();
    /**
     * The boss bar icon for end boss.
     * @type {Boss_bar_icon}
     */
    bossBarIcon = new Boss_bar_icon();
    /**
     * The current level configuration.
     * @type {Level}
     */
    level = currentLevel;
    /**
     * Array of throwable bottles in the world.
     * @type {ThrowableObject[]}
     */
    bottles = [];
    /**
     * Array of collectable objects in the world.
     * @type {CollectableObject[]}
     */
    CollectableObjects = [];
    /**
     * Creates a new World instance.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input for controlling the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }
    /**
     * Sets up the world, initializes character properties and collects objects.
     */
    setWorld() {
        this.character.world = this;
        this.setCollectableObjects(this.level.coins);
        this.setCollectableObjects(this.level.bottles_coll);
        lastKeyPressTime = Date.now(); // Important for idle animation
    }
    /**
     * Runs the game loop to check collisions, throw objects, and perform jump kills.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkJumpKill();
        }, 50);
    }
    /**
     * Adds objects to the CollectableObjects array.
     * @param {CollectableObject[]} array - The array of collectable objects to be added.
     */
    setCollectableObjects(array) {
        for (let i = 0; i < array.length; i++) {
            const object = array[i];
            this.CollectableObjects.push(object);
        }
    }
    /**
     * Checks for collisions between character and enemies or collectable objects.
     */
    checkCollisions() {
        this.enemyCollisionHandler();
        this.collectablesCollisionHandler();
    }
    /**
     * Checks for player input to throw objects.
     */
    checkThrowObjects() {
        if (this.querys(1)) {
            //throw right
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.bottles.push(bottle);
        } else if (this.querys(2)) {
            //throw left
            let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 90);
            this.bottles.push(bottle);
        }
    }
    /**
     * Checks if character jump can cause damage to enemies.
     */
    checkJumpKill() {
        const character = this.character;
        const enemies = this.level.enemies;
        if (character.jumped && character.speedY < 0 && !character.godmode) {
            for (let i = 0; i < enemies.length; i++) {
                const enemy = enemies[i];
                if (this.isCharacterCollidingWithEnemy(character, enemy)) {
                    this.reduceEnemyHp(enemy, 20);
                }
            }
        }
    }
    /**
  * Handles collisions with enemies.
  */
    enemyCollisionHandler() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterIsCollidingEnemy(enemy) && !enemy.dead) {
                this.character.hit(enemy.demage)
            } else if (this.enemyIsInSight(enemy) && !(enemy instanceof Endboss)) {
                enemy.playEnemySound();
            } else if (this.isCharacterBehindEndboss(this.character, enemy) && (enemy instanceof Endboss)) {
                enemy.otherDirection = true
            } else {
                enemy.otherDirection = false
            }
            this.bottleCollisonHandler(enemy)
        });
    }
    /**
     * Handles collisions between bottles and enemies.
     * @param {Enemy} enemy - The enemy object.
     */
    bottleCollisonHandler(enemy) {
        this.bottles.forEach((bottle) => {
            if (this.checkBottleEnemyCollision(bottle, enemy)) {
                this.enemyGetBottleHit(bottle, enemy)
            }
        });
    }
    /**
     * Handles collisions with collectable objects.
     */
    collectablesCollisionHandler() {
        this.CollectableObjects.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                this.CollectableObjects[index].collectItem(index);
            }
        });
    }
    /**
     * Checks if character is colliding with an enemy.
     * @param {Character} character - The character object.
     * @param {Enemy} enemy - The enemy object.
     * @returns {boolean} - Returns true if collision is detected, otherwise false.
     */
    isCharacterCollidingWithEnemy(character, enemy) {
        const characterHitbox = this.setCharacterHitbox(character)
        const enemyHitbox = this.setEnemyHitbox(enemy)
        return this.areRectanglesColliding(characterHitbox, enemyHitbox);
    }
    /**
     * Sets the hitbox for the character.
     * @param {Character} character - The character object.
     * @returns {Object} - Returns an object with x, y, width, and height properties representing the hitbox.
     */
    setCharacterHitbox(character) {
        return {
            x: character.x + character.hitboxX,
            y: character.y + character.hitboxY,
            width: character.hitboxWidth,
            height: character.hitboxHeight
        };
    }
    /**
     * Sets the hitbox for an enemy.
     * @param {Enemy} enemy - The enemy object.
     * @returns {Object} - Returns an object with x, y, width, and height properties representing the hitbox.
     */
    setEnemyHitbox(enemy) {
        return {
            x: enemy.x + enemy.hitboxX,
            y: enemy.y + enemy.hitboxY,
            width: enemy.hitboxWidth,
            height: enemy.hitboxHeight
        };
    }
    /**
     * Checks if the character is behind an endboss.
     * @param {Character} character - The character object.
     * @param {Endboss} endboss - The endboss object.
     * @returns {boolean} - Returns true if character is behind endboss, otherwise false.
     */
    isCharacterBehindEndboss(character, endboss) {
        const characterHitboxX = character.x + character.hitboxX;
        const characterHitboxY = character.y + character.hitboxY;
        const endbossHitboxX = endboss.x + endboss.hitboxX;
        const endbossHitboxY = endboss.y + endboss.hitboxY;
        return (
            characterHitboxX > endbossHitboxX + endboss.hitboxWidth &&
            characterHitboxY + character.hitboxHeight > endbossHitboxY &&
            characterHitboxY < endbossHitboxY + endboss.hitboxHeight
        );
    }
    /**
     * Reduces enemy HP and handles enemy death.
     * @param {Enemy} enemy - The enemy object.
     * @param {number} dmg - The amount of damage to inflict.
     */
    reduceEnemyHp(enemy, dmg) {
        if (!enemy.sperre) {
            enemy.hp -= dmg
            if (enemy.isDead()) {
                this.removeEnemy(enemy);
            } else {
                if (enemy instanceof Endboss) {
                    enemy.hurt()
                }
            }
        }
    }
    /**
     * Checks if the character is colliding with an enemy.
     * @param {Enemy} enemy - The enemy object.
     * @returns {boolean} - Returns true if collision is detected, otherwise false.
     */
    characterIsCollidingEnemy(enemy) {
        if (this.character.isColliding(enemy)) {
            return true
        } else return false
    }
    /**
     * Checks if enemy is in sight of the character.
     * @param {Enemy} enemy - The enemy object.
     * @returns {boolean} - Returns true if enemy is in sight, otherwise false.
     */
    enemyIsInSight(enemy) {
        if (this.character.isInSight(enemy, 550) && enemy instanceof Endboss) {
            this.level.enemies[this.level.enemies.length - 1].bossAktive = true
            return true
        }
        else if (this.character.isInSight(enemy, 550) && !enemy.dead && !(enemy instanceof Endboss)) {
            return true
        }
        else return false
    }
    /**
     * Checks if bottle is colliding with enemy.
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Enemy} enemy - The enemy object.
     * @returns {boolean} - Returns true if collision is detected, otherwise false.
     */
    checkBottleEnemyCollision(bottle, enemy) {
        if (bottle.isColliding(enemy)) {
            return true; // Collision detected
        }
        return false; // No collision
    }
    /**
     * Handles bottle hit on enemy.
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Enemy} enemy - The enemy object.
     */
    enemyGetBottleHit(bottle, enemy) {
        bottle.bottleOnGround = true
        bottle.bottleCracking()
        this.reduceEnemyHp(enemy, 20)
    }
    /**
     * Checks if two rectangles are colliding.
     * @param {Object} rect1 - The first rectangle object.
     * @param {Object} rect2 - The second rectangle object.
     * @returns {boolean} - Returns true if collision is detected, otherwise false.
     */
    areRectanglesColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }
    /**
     * Removes an enemy from the level.
     * @param {Enemy} enemy - The enemy object.
     */
    removeEnemy(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }
    /**
     * Draws the game elements on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, canvas.height)
        this.drawBackgroundObjects()
        this.drawBars()
        this.drawObjects()
        this.showMenu()
        this.showGameEndingScreen()
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }
    /**
     * Adds multiple objects to the map.
     * @param {Array} obc - Array of objects to add.
     */
    addObjectsToMap(obc) {
        obc.forEach(o => {
            this.addToMap(o);
        });
    }
    /**
     * Adds an object to the map.
     * @param {MovableObject} mo - The movable object.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(mo)
        }
        mo.draw(this.ctx)
        if (mo.otherDirection) {
            mo.flipImageBack(mo)
        }
    }
    /**
   * Draws background objects on the canvas.
   */
    drawBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects)
        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.CollectableObjects)
        this.ctx.translate(-this.camera_x, 0)
    }
    /**
     * Draws status bars on the canvas.
     */
    drawBars() {
        this.addToMap(this.statusBar)
        this.addToMap(this.coinBar)
        this.addToMap(this.bottlesBar)
        this.addToMap(this.bossBar)
        this.addToMap(this.bossBarIcon)
    }
    /**
     * Draws objects on the canvas.
     */
    drawObjects() {
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)
        this.addObjectsToMap(this.bottles)
        this.ctx.translate(-this.camera_x, 0)
    }
    /**
     * Shows the menu on the canvas.
     */
    showMenu() {
        if (!this.menu.hideMenu) {
            this.ctx.translate(this.camera_x, 0)
            this.addToMap(this.menu)
            this.addToMap(this.menu.startButton)
            this.ctx.translate(-this.camera_x, 0)
        }
    }
    /**
     * Shows the game ending screen on the canvas.
     */
    showGameEndingScreen() {
        if (!endingMenu) {
            this.ctx.translate(this.camera_x, 0)
            if (gameOver) {
                this.drawGameEndingScreen('lost')
            } else if (gameWon) {
                this.drawGameEndingScreen('won')
            }
            this.ctx.translate(-this.camera_x, 0)
        }
    }
    /**
     * Draws the game ending screen based on the ending type.
     * @param {string} ending - The type of ending (either 'won' or 'lost').
     */
    drawGameEndingScreen(ending) {
        this.createEndingScreen()
        this.addToMap(this.endingScreen(ending))
        this.addToMap(this.endingScreen(ending).replayButton)
    }
    /**
     * Returns the corresponding game ending screen based on the ending type.
     * @param {string} ending - The type of ending (either 'won' or 'lost').
     * @returns {Menu} - The game ending screen.
     */
    endingScreen(ending) {
        if (ending === 'won')
            return this.gameWonScreen
        else
            return this.gameOverScreen
    }
    /**
     * Creates the game ending screen.
     */
    createEndingScreen() {
        if ((gameOver && !this.gameOverScreen) || (gameWon && !this.gameWonScreen) && !gameRestart) {
            let screenType = gameOver ? "game_over" : "game_won";
            let screenImage = MENU_IMAGES[`${screenType}_img`];
            let screen = this.createScreen(screenImage);
            this.menu.pushButtons(screen.replayButton);
            if (gameOver) {
                this.gameOverScreen = screen;
            } else if (gameWon) {
                this.gameWonScreen = screen;
            }
        }
        gameRestart = true
    }
    /**
     * Creates a screen with a replay button.
     * @param {Image} screenImage - The image for the screen.
     * @returns {Menu} - The created screen.
     */
    createScreen(screenImage) {
        let x = this.character.x - 100;
        let x2 = this.character.x + 150;
        let screen = new Menu(x, 0, 720, 500, screenImage);
        screen.replayButton = new Replay_button(x2, 25, 200, 80, MENU_IMAGES.replay_button);
        return screen;
    }
    /**
     * Handles query conditions for throwing objects.
     * @param {number} s - The query condition number.
     * @returns {boolean} - Returns true if the conditions are met, otherwise false.
     */
    querys(s) {
        if (s === 1) {
            return this.keyboard.throw && !this.character.isCharacterAboveGround() && !this.character.isHurt() && !this.character.dead && !this.character.otherDirection && this.bottlesBar.checkBottleBar() && this.character.setCooldown()
            // Don't allow any other move when throwing to the right.
        }
        else if (s === 2) {
            return this.keyboard.throw && !this.character.isCharacterAboveGround() && !this.character.isHurt() && !this.character.dead && this.character.otherDirection && this.bottlesBar.checkBottleBar() && this.character.setCooldown()
            // Don't allow any other move when throwing to the left.
        }
    }
}


