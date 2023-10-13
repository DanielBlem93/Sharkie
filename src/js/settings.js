/**
 * Variable to track if audio is muted.
 */
let audioIsMuted = false;

/**
 * Toggles between muting and unmuting audio.
 */
function toggle() {
    const soundOnImg = document.querySelector('.sound-on-img');
    const soundOffImg = document.querySelector('.sound-off-img');
    if (audioIsMuted) {
        audioIsMuted = false;
        soundOnImg.style.display = 'unset';
        soundOffImg.style.display = 'none';
        masterAudio.setVolume(1);
    } else {
        audioIsMuted = true;
        soundOnImg.style.display = 'none';
        soundOffImg.style.display = 'unset';
        masterAudio.setVolume(0);
    }
}

/**
 * Toggles the display of a menu element.
 * @param {string} param - The CSS selector for the menu element.
 */
function toggleMenu(param) {
    const menu = document.querySelector(`${param}`);
    menu.style.display = (menu.style.display === 'none') ? 'flex' : 'none';
}

/**
 * Sets an interval to periodically check if the device is mobile.
 */
function watchForMobileDevices() {
    setInterval(function() {
        isMobileDevices();
    }, 1000); // Check every 1 second, can be adjusted
}

/**
 * Checks if the device is a mobile device and adjusts UI accordingly.
 */
function isMobileDevices() {
    let info = document.getElementById('responsiv-info');
    if (window.innerWidth < 720 || window.innerHeight < 480) {
        checkMobileMode()
    } else {
        info.style.display = 'none';
    }
}

/**
 * Checks if the device is in landscape mode.
 * @returns {boolean} - True if in landscape mode, false otherwise.
 */
function checkMobileMode(){
    let info = document.getElementById('responsiv-info');
    if (info) {
        info.style.display = isLandscape() ? 'none' : 'flex';
    }
}

/**
 * Checks if the device is in landscape mode.
 * @returns {boolean} - True if in landscape mode, false otherwise.
 */
function isLandscape() {
    return window.innerWidth > window.innerHeight;
}
