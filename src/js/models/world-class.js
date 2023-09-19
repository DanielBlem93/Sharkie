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
        }, 100);
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

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
            } else if (this.character.isInSight(enemy, 600) && !enemy.dead) {
                enemy.playEnemySound();
            }
        });

        this.CollectableObjects.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                this.CollectableObjects[index].collectItem(index);
            }
        });
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
        try {
            if (mo.otherDirection) {
                this.flipImage(mo)
            }
            mo.draw(this.ctx)
            mo.drawFrame(this.ctx)

            if (mo.otherDirection) {
                this.flipImageBack(mo)
            }
        } catch (error) {
            console.log(error)
            console.log(mo)

        }
    }

    flipImage(mo) {

        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore()
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

    setCollectableObjects(array){
        for (let I = 0; I < array.length; I++) {
            const objects = array[I];
            this.CollectableObjects.push(objects)
            
        }
    }

}


