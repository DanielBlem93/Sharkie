let canvas;
let world;
let keyboard = new Keyboard();;
let gameStart = false
let gameOver = false
let gameWon = false
let gameRestart = false
let tastaturGesperrt = true;

let lastKeyPressTime
const gesperrteTasten = ["w", "a", "s", "d", "f", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
intervals = []


function init() {
    canvas = document.getElementById('canvas')
    setNewWorld()
    buttonClickListener()
    watchForMobileDevices()
}

function tastaturSperren() {
    tastaturGesperrt = true
    allFalse()
    setTimeout(function () {
        tastaturGesperrt = false;
    }, 1500);
}

async function setNewWorld() {
    await preLoad()
    if (allImagesLoaded && allAudiosLoaded) {
        world = new World(canvas, keyboard)
        masterAudio.setVolume(1)
    } else
        console.log('World not created')
}


function newGame() {
    location.reload();
}

function buttonClickListener() {
    canvas.addEventListener('click', function (event) {
        const scaleX = canvas.width / canvas.offsetWidth;
        const scaleY = canvas.height / canvas.offsetHeight;

        const mouseX = (event.clientX - canvas.getBoundingClientRect().left) * scaleX;
        const mouseY = (event.clientY - canvas.getBoundingClientRect().top) * scaleY;
        world.menu.buttons.forEach(button => {
            if (button.isClicked(mouseX, mouseY)) {
                button.onClick();
            }
        });
    });
}

function allFalse() {
    keyboard.up = false
    keyboard.left = false
    keyboard.down = false
    keyboard.right = false
    keyboard.space = false
    keyboard.up = false
    keyboard.throw = false
}

window.addEventListener('keydown', (e) => {
    if (!tastaturGesperrt) {
        switch (e.code) {
            case 'KeyW':
            case 'ArrowUp':
                keyboard.up = true;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                keyboard.left = true;
                break;
            case 'KeyS':
            case 'ArrowDown':
                keyboard.down = true;
                break;
            case 'KeyD':
            case 'ArrowRight':
                keyboard.right = true;
                break;
            case 'Space':
                keyboard.space = true;
                break;
            case 'KeyF':
                keyboard.throw = true;
                break;
        }
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = false;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            keyboard.left = false;
            break;
        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = false;
            break;
        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = false;
            break;
        case 'Space':
            keyboard.space = false;
            break;
        case 'KeyF':
            keyboard.throw = false;
            break;
    }
    lastKeyPressTime = Date.now();
});

function handleButtonTouch(button, action, state) {
    button.addEventListener('touchstart', function (event) {
        event.preventDefault();
        if (!tastaturGesperrt) {
            keyboard[action] = state;
        }
        lastKeyPressTime = Date.now();
    });

    button.addEventListener('touchend', function (event) {
        event.preventDefault();
        keyboard[action] = !state;
    });
}

let buttonUp = document.getElementById('up')
let buttonLeft = document.getElementById('left')
let buttonRight = document.getElementById('right')
let buttonThrow = document.getElementById('throw')

handleButtonTouch(buttonUp, 'space', true);
handleButtonTouch(buttonLeft, 'left', true);
handleButtonTouch(buttonRight, 'right', true);
handleButtonTouch(buttonThrow, 'throw', true);
