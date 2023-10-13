/**
 * Variables to keep track of loaded resources and game state.
 */
let allImagesLoaded = false; // Indicates if all images are loaded.
let allAudiosLoaded = false; // Indicates if all audios are loaded.
let loadedFiles = 0; // Counter for loaded files.
let files; // Total number of files to load.
let counter = 0; // Counter for tracking loaded files.

/**
 * Arrays of objects that contain image paths.
 */
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

/**
 * Array to hold image paths.
 */
const imagePaths = [];

/**
 * Array to hold loaded images.
 */
const images = [];

/**
 * Object to hold loaded audio objects.
 */
const LOADED_AUDIOS = {};

//===========Preload IMAGES==================

/**
 * Preloads images from the imagePaths array.
 * @returns {Promise} A promise that resolves when all images are loaded.
 */
function preloadImages() {
    return Promise.all(imagePaths.map(loadImage));
}

/**
 * Loads an image.
 * @param {string} src - Image source path.
 * @returns {Promise} A promise that resolves when the image is loaded.
 */
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            images.push(image);
            resolve(image);
            loadedFiles++;
        };
        image.onerror = reject;
        image.src = src;
    });
}

/**
 * Pushes all image paths from various arrays to the imagePaths array.
 */
function pushAllPaths() {
    pushArrays(objectsWithArrays);
    pushArrays(objects);
    files = imagePaths.length + audioPaths.length;
}

/**
 * Pushes all image paths from an array to the imagePaths array.
 * @param {Array} array - Array of image paths.
 */
function pushArrays(array) {
    array.forEach(element => {
        try {
            pushObjekt(element);
        } catch (error) {
            pushOnlyObjekt(element);
        }
    });
}

/**
 * Pushes image paths from an object to the imagePaths array.
 * @param {Object} obj - Object containing image paths.
 */
function pushObjekt(obj) {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        pushPath(value);
    });
}

/**
 * Pushes a single image path to the imagePaths array.
 * @param {Array} array - Array of image paths.
 */
function pushPath(array) {
    array.forEach(path => {
        imagePaths.push(path);
    });
}

/**
 * Pushes a single image path to the imagePaths array.
 * @param {Object} obj - Object containing image paths.
 */
function pushOnlyObjekt(obj) {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        imagePaths.push(value);
    });
}

// ================Preload AUDIOS ====================

/**
 * Creates an audio object and resolves it when loaded.
 * @param {string} path - Audio source path.
 * @returns {Promise} A promise that resolves when the audio is loaded.
 */
function createAudioObject(path) {
    return new Promise((resolve, reject) => {
        const audio = new Audio(path);
        audio.addEventListener('loadeddata', () => {
            const key = path.split('/').pop().split('.')[0];
            LOADED_AUDIOS[key] = audio;
            resolve();
            loadedFiles++;
        });
        audio.addEventListener('error', reject);
    });
}

/**
 * Loads all audios from the audioPaths array.
 * @returns {Promise} A promise that resolves when all audios are loaded.
 */
async function loadAudios() {
    const audioPromises = audioPaths.map(createAudioObject);
    try {
        await Promise.all(audioPromises);
        return true; // All audios loaded successfully
    } catch (error) {
        console.error('Error loading audio files:', error);
        return false; // Error occurred while loading
    }
}

/**
 * Preloads images and audios and sets appropriate flags.
 */
async function preLoad() {
    pushAllPaths();
    await preloadImages().then(() => {
        console.log('Images loaded:');
        allImagesLoaded = true;
    });
    await loadAudios().then((success) => {
        allAudiosLoaded = success;
        if (success) {
            console.log('All audios loaded:');
        } else {
            console.error('Error loading audios.');
        }
    });
}

/**
 * Sets the loading screen content.
 */
function setLoadingscreen() {
    let loadingscreen = document.getElementById('loading-screen');
    let loadingscreenContainer = document.getElementById('loading-screen-container');
    loadingscreen.innerHTML = `${loadedFiles} files / ${files} loaded `;
    if (loadedFiles === files) {
        setTimeout(() => {
            loadingscreen.innerHTML = '';
            loadingscreenContainer.style.display = 'none';
        }, 500);
    }
}

/**
 * Watches for loaded files and updates the loading screen.
 */
function watchLoadedFiles() {
    let previousValue = loadedFiles;
    let filesLoaded = setInterval(() => {
        if (loadedFiles !== previousValue) {
            setLoadingscreen();
            previousValue = loadedFiles;
        } else if (gameStart) {
            clearInterval(filesLoaded);
        }
    }, 100); // Check every 100 milliseconds
}

watchLoadedFiles();
