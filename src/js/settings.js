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

function toggleFullscreen() {
    let fullscreen = document.getElementById('fullscreen2')
    enterFullscreen(fullscreen)
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
