let audioIsMuted = false

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

function toggleMenu(param) {

    const menu = document.querySelector(`${param}`);
    menu.style.display = (menu.style.display === 'none') ? 'flex' : 'none';
}

function watchForMobileDevices() {
    setInterval(function() {
        isMobileDevices();
    }, 1000); // Überprüfung alle 1 Sekunde, kann angepasst werden
}



function isMobileDevices() {
    let info = document.getElementById('responsiv-info');
    if (window.innerWidth < 720 || window.innerHeight < 480) {
        checkMobileMode()
    }else
    info.style.display = 'none';
}


function checkMobileMode(){
    let info = document.getElementById('responsiv-info');
    if (info) {
        info.style.display = isLandscape() ? 'none' : 'flex';
    }
}

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}

