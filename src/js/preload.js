
let allImagesLoaded = false
let allAudiosLoaded = false;
let loadedFiles = 0
let files
let counter = 0


const objectsWithArrays = [
    STATUSBAR_IMAGES,
    CHARACTER_IMAGES,
    CHICKEN_IMAGES,
    BABY_CHICKEN_IMAGES,
    CHICKEN_BOSS_IMAGES,
    COLLACTABLES_IMAGES,
    THROWABLES_IMAGES,
];
const objects = [
    MENU_IMAGES,
    BACKGROUND_IMAGES
]
const imagePaths = [];
const images = [];
const LOADED_AUDIOS = {};

//===========Preload IMAGES==================

function preloadImages() {
    return Promise.all(imagePaths.map(loadImage));
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            images.push(image);
            resolve(image);
            loadedFiles++
        };
        image.onerror = reject;
        image.src = src;

    });
}

function pushAllPaths() {
    pushArrays(objectsWithArrays)
    pushArrays(objects)
    files = imagePaths.length + audioPaths.length

}

function pushArrays(array) {
    array.forEach(element => {
        try {
            pushObjekt(element)
        } catch (error) {
            pushOnlyObjekt(element)
        }
    });
}

function pushObjekt(obj) {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        pushPath(value)
    });
}

function pushPath(array) {
    array.forEach(path => {
        imagePaths.push(path)
    });
}

function pushOnlyObjekt(obj) {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        imagePaths.push(value)
    });
}



// ================Preload AUDIOS ====================



function createAudioObject(path) {
    return new Promise((resolve, reject) => {
        const audio = new Audio(path);
        audio.addEventListener('loadeddata', () => {
            const key = path.split('/').pop().split('.')[0];
            LOADED_AUDIOS[key] = audio;
            resolve();
            loadedFiles++
        });
        audio.addEventListener('error', reject);

    });
}

async function loadAudios() {
    const audioPromises = audioPaths.map(createAudioObject);
    try {
        await Promise.all(audioPromises);
        return true; // Alles wurde erfolgreich geladen
    } catch (error) {
        console.error('Fehler beim Laden der Audiodateien:', error);
        return false; // Es gab einen Fehler beim Laden
    }
}


async function preLoad() {

    pushAllPaths()

    await preloadImages().then(() => {
        console.log('Bilder wurden geladen:');
        allImagesLoaded = true

    });

    await loadAudios().then((success) => {
        allAudiosLoaded = success;
        if (success) {
            console.log('Alle Audios wurden geladen:');
        } else {
            console.error('Es gab Fehler beim Laden der Audios.');
        }
    });
}

function setLoadingscreen() {
    let loadingscreen = document.getElementById('loading-screen');
    let loadingscreenContainer = document.getElementById('loading-screen-container');
    loadingscreen.innerHTML = `${loadedFiles} data out of ${files} loaded `;

    if (loadedFiles === files) {
        setTimeout(() => {
            loadingscreen.innerHTML = '';
            loadingscreenContainer.style.display = 'none';
        }, 500);
    }
}


function watchLoadedFiles() {
    let previousValue = loadedFiles;

    let filesLoaded = setInterval(() => {
        if (loadedFiles !== previousValue) {
            setLoadingscreen();
            previousValue = loadedFiles;
        }else if(gameStart)
        clearInterval(filesLoaded)
    }, 100); // Überprüfe alle 100 Millisekunden
}


watchLoadedFiles();









