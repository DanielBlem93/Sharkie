
let allImagesLoaded = false
let allAudiosLoaded = false;

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


function preloadImages() {
    return Promise.all(imagePaths.map(loadImage));
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            images.push(image);
            resolve(image);
        };
        image.onerror = reject;
        image.src = src;
    });
}

function pushAllPaths() {
    pushArrays(objectsWithArrays)
    pushArrays(objects)
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
        console.log('Bilder wurden geladen:', images);
        allImagesLoaded = true

    });

     await loadAudios().then((success) => {
        allAudiosLoaded = success;
        if (success) {
            console.log('Alle Audios wurden geladen:', LOADED_AUDIOS);
        } else {
            console.error('Es gab Fehler beim Laden der Audios.');
        }
    });
}














