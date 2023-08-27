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

    }

    else if (e.key === 'a') {
        keyboard.left = true

    }

    else if (e.key === 's') {
        keyboard.down = true
   
    }

    else if (e.key === 'd') {
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
})


// keyup
window.addEventListener('keyup', (e) => {

    if (e.key === 'w') {
        keyboard.up = false
 
    }

    else if (e.key === 'a') {
        keyboard.left = false
     
    }

    else if (e.key === 's') {
        keyboard.down = false
        
    }

    else if (e.key === 'd') {
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
})