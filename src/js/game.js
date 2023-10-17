/**
 * Initializes the game, sets up canvas and world.
 */

let canvas;
let world;
let currentLevel
let keyboard = new Keyboard();;
let gameStart = false
let gameOver = false
let gameWon = false
let gameRestart = false
let endingMenu = false
let tastaturGesperrt = true;
let lastKeyPressTime

const gesperrteTasten = ["w", "a", "s", "d", "f", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
intervals = []

/**
 * starts when body is loaded and prepare game for start
 */
function init() {

    canvas = document.getElementById('canvas');
    setNewWorld();
    buttonClickListener();
    watchForMobileDevices();
    console.log(`Information an den der es kontrolliert:

    -Die kleine Verzögerung wenn man erneut springen möchte ist gewollt.
    
    -Der Startbutton und der Replay button werden mit JS ins canvas gezeichnet.
     daher auch kein cursor: pointer (beim nächsten mal würde ich das auch anders machen)
     das ganze Canvas hat jetzt cursort:pointer bekommen 
 
    -intro Musik wurde entfernt(probleme mit IOS geräten)

    -druch die ganzen JS Doc kommentare sind meine JS Datein ziemlich lang geworden. Meine World Datei
    auf eine neue Datei auszulagern würde sehr viel Arbeit bedeuten da sich so viele variablen und Funktionen auf die World beziehen.
    Vielleicht kann man da ein Auge zudrücken? `)
}
/**
 * Asynchronously sets up a new world after preloading resources.
 */

async function setNewWorld() {

    await preLoad();
    if (allImagesLoaded && allAudiosLoaded) {
        currentLevel = level1
        world = new World(canvas, keyboard);
        masterAudio.setVolume(1);
    } else {
        console.log('World not created');
    }
}
/**
 * Adds click event listener to the canvas for menu buttons.
 */

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

/**
 * resets all varaibales and restarts the game
 */
function startNewGame() {
    clearIntervals();
    gameStart = false;
    gameOver = false;
    gameWon = false;
    gameRestart = false
    endingMenu = null
    world.gameOverScreen = null
    world.gameWonScreen = null
    gameStart = true
    resetLevel()
    resetCharacter()
    resetBoss()
}
/**
 * resets the level to the begining state
 */
function resetLevel() {
    let currentEnemies = createLevel1Enemies()
    let currenClouds = createClouds()
    world.level.enemies = currentEnemies
    world.level.clouds = currenClouds
    resetCollectableObjects()

}
/**
 * respawns all collactable objects
 */
function resetCollectableObjects() {
    let currentCoins = createCoins()
    let currentBotlles = createBottles()
    world.CollectableObjects = []
    pushCollectableObjects(currentCoins)
    pushCollectableObjects(currentBotlles)

}
/**
 * pushes all collectables to the rendering array
 */
function pushCollectableObjects(CollectableObject) {
    CollectableObject.forEach(Object => {
        world.CollectableObjects.push(Object)
    });
}
/**
 * resets the character and statusbars to the begining state
 */
function resetCharacter() {
    world.character.dead = false
    world.character.died = false
    tastaturGesperrt = false;
    world.character.x = 120
    world.character.y = 135
    world.character.j = 0
    world.character.energy = 100
    world.character.animate()
    world.statusBar.setHealth(100)
    world.bottlesBar.bottles = 20
    world.bottlesBar.setBottles(0)
    world.coinBar.coins = 0
    world.coinBar.setCoins(0)
}

/**
 * resets the boss and the bar to the begining state
 */
function resetBoss() {
    world.bossBar = new Bossbar()
    world.bossBarIcon = new Boss_bar_icon()
    AUDIOS.boss_song.pause()
    AUDIOS.boss_song.currentTime = 0
    AUDIOS.theme_song.currentTime = 0
    AUDIOS.theme_song.play()
}


/**
 * Clears all intervals in the intervals array.
 */
function clearIntervals() {
    intervals.forEach(element => {
        clearInterval(element);
    });
}


/**
 * Locks the keyboard for a short duration.
 */
function tastaturSperren() {
    tastaturGesperrt = true;
    allFalse();
    setTimeout(function () {
        tastaturGesperrt = false;
    }, 1500);
}



/**
 * Sets all keyboard properties to false.
 */
function allFalse() {
    keyboard.up = false;
    keyboard.left = false;
    keyboard.down = false;
    keyboard.right = false;
    keyboard.space = false;
    keyboard.up = false;
    keyboard.throw = false;
}

// Event listener for keydown
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

// Event listener for keyup
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

/**
 * Handles touch events on buttons.
 * @param {HTMLElement} button - The button element.
 * @param {string} action - The action (e.g., 'space' or 'left').
 * @param {boolean} state - The state (true for touchstart, false for touchend).
 */
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

// Buttons for touch controls
let buttonUp = document.getElementById('up');
let buttonLeft = document.getElementById('left');
let buttonRight = document.getElementById('right');
let buttonThrow = document.getElementById('throw');

// Assign touch event handlers
handleButtonTouch(buttonUp, 'space', true);
handleButtonTouch(buttonLeft, 'left', true);
handleButtonTouch(buttonRight, 'right', true);
handleButtonTouch(buttonThrow, 'throw', true);


