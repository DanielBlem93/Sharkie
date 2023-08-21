let canvas;
let world


function init() {
    canvas = document.getElementById('canvas')
    world = new World(canvas)

    console.log('my character is', world.character)
}



// document.addEventListener('keypress', (e) => {
//     if (e.key === 'd' || 'D') {
//         console.log(e)
//         world.character.moveRight()
//         world.draw()
//     } else {}
// })

// document.addEventListener('keypress', (e) => {
//     if (e.key === 'a' || 'A') {
//         console.log(e)
//         world.character.moveLeft()
//         world.draw()
//     } else {}
// })