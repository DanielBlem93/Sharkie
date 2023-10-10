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


// function stopIntervals() {
//     intervals.forEach(intervalId => {
//         clearInterval(intervalId);
//     });
//     intervals = [];
// }

function init() {
    canvas = document.getElementById('canvas')
    setNewWorld()
    buttonClickListener()
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
        console.log(mouseX)
        world.menu.buttons.forEach(button => {
            if (button.isClicked(mouseX, mouseY)) {
                button.onClick();
                console.log(button);
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