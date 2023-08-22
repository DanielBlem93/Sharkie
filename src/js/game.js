let canvas;
let world;
let keyboard = new Keyboard();;


function init() {
    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard)


    console.log('my character is', world.character)
}


//keydown
window.addEventListener('keydown', (e) => {

    if (e.key === 'w') {
        keyboard.up = true
        console.log(e.key)
    }

    else if (e.key === 'a') {
        keyboard.left = true
        console.log(e.key)
    }

    else if (e.key === 's') {
        keyboard.down = true
        console.log(e.key)
    }

    else if (e.key === 'd') {
        keyboard.right = true
        console.log(e.key)
    }

    else if (e.code === 'Space') {
        keyboard.space = true
        console.log(e.code)
    }

    else if (e.key === 'ArrowUp') {
        keyboard.up = true
        console.log(e.key)
    }

    else if (e.key === 'ArrowLeft') {
        keyboard.left = true
        console.log(e.key)
    }

    else if (e.key === 'ArrowDown') {
        keyboard.down = true
        console.log(e.key)
    }

    else if (e.key === 'ArrowRight') {
        keyboard.right = true
        console.log(e.key)
    }
})


// keyup
window.addEventListener('keyup', (e) => {

    if (e.key === 'w') {
        keyboard.up = false
        console.log(keyboard.up)
    }

    else if (e.key === 'a') {
        keyboard.left = false
        console.log(keyboard.left)
    }

    else if (e.key === 's') {
        keyboard.down = false
        console.log(keyboard.down)
    }

    else if (e.key === 'd') {
        keyboard.right = false
        console.log(keyboard.right)
    }

    else if (e.code === 'Space') {
        keyboard.space = false
        console.log(keyboard.space)
    }

    else if (e.key === 'ArrowUp') {
        keyboard.up = false
        console.log(keyboard.up)
    }

    else if (e.key === 'ArrowLeft') {
        keyboard.left = false
        console.log(keyboard.left)
    }

    else if (e.key === 'ArrowDown') {
        keyboard.down = false
        console.log(keyboard.down)
    }

    else if (e.key === 'ArrowRight') {
        keyboard.right = false
        console.log(keyboard.right)
    }
})