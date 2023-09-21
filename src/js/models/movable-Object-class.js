class MovableObjekt extends DrawableObject {

    speed = 0.15
    speedY = 0
    jumpPower = 27
    acceleration = 2
    energy = 100
    lastHit = 0
    godmode = false
    otherDirection = false
    dead = false
    sound
    deadSound
    currentSound = 0
    getHit

    // 
    isColliding(mo) {
        const hitboxX = this.x + this.hitboxX;
        const hitboxY = this.y + this.hitboxY;

        if (mo instanceof MovableObjekt) {
            return hitboxX < mo.x + mo.hitboxX + mo.hitboxWidth &&
                hitboxY < mo.y + mo.hitboxY + mo.hitboxHeight &&
                hitboxX + this.hitboxWidth > mo.x + mo.hitboxX &&
                hitboxY + this.hitboxHeight > mo.y + mo.hitboxY &&
                !world.character.jumped &&
                !world.character.isFallingBack;
        } else {
            return hitboxX < mo.x + mo.hitboxX + mo.hitboxWidth &&
                hitboxY < mo.y + mo.hitboxY + mo.hitboxHeight &&
                hitboxX + this.hitboxWidth > mo.x + mo.hitboxX &&
                hitboxY + this.hitboxHeight > mo.y + mo.hitboxY;
        }
    }

    isInSight(mo, sightRange) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        const moCenterX = mo.x + mo.width / 2;
        const moCenterY = mo.y + mo.height / 2;

        const distance = Math.sqrt((centerX - moCenterX) ** 2 + (centerY - moCenterY) ** 2);

        return distance <= sightRange;
    }

    setRandomSpeed(speed) {
        this.speed = speed + Math.random() * 0.3;
    }
    setRandomPosition(minPosition) {
        this.x = minPosition + Math.random() * 719 * levelLength;
    }

    hit(demage) {

        if (this.godmode) {
            console.log('Godmode on')
        } else {
            this.takingDamge(demage);
            this.godmodeON();
        }
    }
    godmodeON() {

        this.godmode = true
        setTimeout(() => {
            this.godmode = false
            this.loadImage('src/img/2_character_pepe/2_walk/W-21.png')
        }, 1000);

    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 8%6 0> 1, Rest 2
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    animateImageOnce(imagesArray, currentIndex) {
        let path = imagesArray[currentIndex];
        this.img = this.imageCache[path];
        currentIndex++;
        return currentIndex;
    }

    playJumpAnimation(jumpImgArray) {
        let animation;
        animation = setInterval(() => {
            if (this.s >= jumpImgArray.length) {

                clearInterval(animation); // Animation nach 9 Durchläufen stoppen
                this.s = 0;
                this.jumped = false

            } else if (this.s < jumpImgArray.length && !this.dead) {
                let path = jumpImgArray[this.s];
                this.img = this.imageCache[path];
                if (this.s === jumpImgArray.length - 2)
                    AUDIOS.jump_landing_sound.play()

                this.s++;
            }
        }, 1000 / 7);
    }

    applyGravity(gravityOn) {
        setInterval(() => {
            if (gravityOn.call(this) || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration
            } else { }
        }, 1000 / 25);
    }

    isCharacterAboveGround() {
        return this.y < 135
    }
    isBottleAboveGround() {

        return this.y < 350
    }

    jump() {
        if (!this.jumped) {
            AUDIOS.jumping_sound.play()
            this.jumped = true
            setTimeout(() => {
                this.speedY = this.jumpPower
            }, 10);
        }
    }
    moveRight() {
        this.x += this.speed
    }
    moveLeft() {
        this.x -= this.speed
    }
    pushChar(left, right) {
        let push = setInterval(() => {
            if (left === 'left') {
                this.moveLeft()
                keyboard.right = false
            }
            else
                this.moveRight()
            keyboard.left = false
        }, 1000 / 30);
        setTimeout(() => {
            clearInterval(push)
        }, 500);

    }

    fallDown() {
        setInterval(() => {
            this.y += 3
        }, 1000 / 30);
    }

    playEnemySound() {

        this.sound.play()
    }
    

}
