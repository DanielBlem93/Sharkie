let canvas;
let ctx;
let world = new World()


function init() {
    canvas = document.getElementsByTagName('canvas')[0]
    ctx = canvas.getContext('2d')


    console.log('my character is', world.character)
}