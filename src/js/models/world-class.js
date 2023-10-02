class World {


    character = new Character()
    canvas;
    ctx;
    keyboard;
    camera_x = 0
    statusBar = new StatusBar()
    coinBar = new Coinbar()
    bottlesBar = new BottlesBar()


    level = level1
    bottles = []
    CollectableObjects = []

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        this.keyboard = keyboard
        this.draw()
        this.setWorld()
        this.run()
    }

    setWorld() {
        this.character.world = this
        this.setCollectableObjects(this.level.coins)
        this.setCollectableObjects(this.level.bottles_coll)
        lastKeyPressTime = Date.now()//important for idle animation

    }

    run() {
        setInterval(() => {
            this.checkCollisions()
            this.checkThrowObjects()
            this.checkJumpKill();
        }, 50);
    }

    setCollectableObjects(array) {
        for (let I = 0; I < array.length; I++) {
            const objects = array[I];
            this.CollectableObjects.push(objects)
        }
    }

    checkCollisions() {
        this.enemyCollisionHandler()
        this.collectablesCollisionHandler()
    }
    checkThrowObjects() {
        if (this.querys(1)) {
            //throw right
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.bottles.push(bottle)

        } else if (this.querys(2)) {
            //throw left
            let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 90)
            this.bottles.push(bottle)
        }
    }

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

    enemyCollisionHandler() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterIsCollidingEnemy(enemy) && !enemy.dead) {
                this.character.hit(enemy.demage)
            } else if (this.enemyIsInSight(enemy) && !(enemy instanceof Endboss)) {
                enemy.playEnemySound();
            } else if (this.isCharacterBehindEndboss(this.character, enemy) && (enemy instanceof Endboss)) {
                console.log('behind')
                enemy.otherDirection = true
            } else {
                enemy.otherDirection = false
            }
            this.bottleCollisonHandler(enemy)

        });
    }

    bottleCollisonHandler(enemy) {
        this.bottles.forEach((bottle) => {
            if (this.checkBottleEnemyCollision(bottle, enemy)) {
                this.enemyGetBottleHit(bottle, enemy)
            }
        });
    }

    collectablesCollisionHandler() {
        this.CollectableObjects.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                this.CollectableObjects[index].collectItem(index);
            }
        });
    }

    isCharacterCollidingWithEnemy(character, enemy) {
        const characterHitbox = {
            x: character.x + character.hitboxX,
            y: character.y + character.hitboxY,
            width: character.hitboxWidth,
            height: character.hitboxHeight
        };

        const enemyHitbox = {
            x: enemy.x + enemy.hitboxX,
            y: enemy.y + enemy.hitboxY,
            width: enemy.hitboxWidth,
            height: enemy.hitboxHeight
        };

        return this.areRectanglesColliding(characterHitbox, enemyHitbox);
    }

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

    characterIsCollidingEnemy(enemy) {
        if (this.character.isColliding(enemy)) {
            return true
        } else return false
    }

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

    checkBottleEnemyCollision(bottle, enemy) {
        if (bottle.isColliding(enemy)) {
            return true; // Kollision wurde festgestellt
        }
        return false; // Keine Kollision
    }

    enemyGetBottleHit(bottle, enemy) {
        bottle.bottleOnGround = true
        bottle.bottleCracking()
        this.reduceEnemyHp(enemy, 20)
    }

    areRectanglesColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    removeEnemy(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, canvas.height)
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects)
        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.CollectableObjects)
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.statusBar)
        this.addToMap(this.coinBar)
        this.addToMap(this.bottlesBar)
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)
        this.addObjectsToMap(this.bottles)
        this.ctx.translate(-this.camera_x, 0)
        //Draw wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(obc) {
        obc.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {

        if (mo.otherDirection) {
            mo.flipImage(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            mo.flipImageBack(mo)
        }
    }

    querys(s) {
        if (s === 1) {
            return this.keyboard.throw && !this.character.isCharacterAboveGround() && !this.character.isHurt() && !this.character.dead && !this.character.otherDirection && this.bottlesBar.checkBottleBar() && this.character.setCooldown()
            //dont allow any other move when you throwing
        }

        else if (s === 2) {
            return this.keyboard.throw && !this.character.isCharacterAboveGround() && !this.character.isHurt() && !this.character.dead && this.character.otherDirection && this.bottlesBar.checkBottleBar() && this.character.setCooldown()
            //dont allow any other move when you throwing for the other direction
        }
    }



}


