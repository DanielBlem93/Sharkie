let canvas;
let world;
let keyboard = new Keyboard();;
let lastKeyPressTime


function init() {
    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard)
    
    masterAudio.setVolume(0.1)
  

    console.log('my character is', world.character)
}



//keydown
window.addEventListener('keydown', (e) => {

    if (e.key === 'w' || e.key === 'W') {
        keyboard.up = true

    }

    else if (e.key === 'a' || e.key === 'A') {
        keyboard.left = true

    }

    else if (e.key === 's' || e.key === 'S') {
        keyboard.down = true

    }

    else if (e.key === 'd' || e.key === 'D') {
        keyboard.right = true

    }

    else if (e.code === 'Space') {
        keyboard.space = true

    }

    else if (e.key === 'ArrowUp') {
        keyboard.up = true

    }

    else if (e.key === 'ArrowLeft') {
        keyboard.left = true

    }

    else if (e.key === 'ArrowDown') {
        keyboard.down = true

    }

    else if (e.key === 'ArrowRight') {
        keyboard.right = true

    }
    else if (e.key === 'f') {
        keyboard.throw = true

    }
})


// keyup
window.addEventListener('keyup', (e) => {

    if (e.key === 'w' || e.key === 'W') {
        keyboard.up = false

    }

    else if (e.key === 'a' || e.key === 'A') {
        keyboard.left = false

    }

    else if (e.key === 's' || e.key === 'S') {
        keyboard.down = false

    }

    else if (e.key === 'd' || e.key === 'D') {
        keyboard.right = false
    }

    else if (e.code === 'Space') {
        keyboard.space = false

    }

    else if (e.key === 'ArrowUp') {
        keyboard.up = false

    }

    else if (e.key === 'ArrowLeft') {
        keyboard.left = false

    }

    else if (e.key === 'ArrowDown') {
        keyboard.down = false

    }

    else if (e.key === 'ArrowRight') {
        keyboard.right = false

    }
    else if (e.key === 'f') {
        keyboard.throw = false

    }
    lastKeyPressTime = Date.now()


})