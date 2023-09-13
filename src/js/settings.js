const audio_settings = {

    title_song: {
        audio: AUDIOS.title_song,
        volume: 0.3
    },
    theme_song: {
        audio: AUDIOS.theme_song,
        volume: 0.3
    },
    boss_song: {
        audio: AUDIOS.boss_song,
        volume: 1
    },
    wind: {
        audio: AUDIOS.wind,
        volume: 1
    },
    crickets: {
        audio: AUDIOS.crickets,
        volume: 0.3
    },
    throw_sound: {
        audio: AUDIOS.throw_sound,
        volume: 1
    },
    bottleCracking_sound: {
        audio: AUDIOS.bottleCracking_sound,
        volume: 1
    },
    walking_sound: {
        audio: AUDIOS.walking_sound,
        volume: 1
    },
    jumping_sound: {
        audio: AUDIOS.jumping_sound,
        volume: 0.8
    },
    jump_landing: {
        audio: AUDIOS.jump_landing_sound,
        volume: 0.8
    },
    snoring: {
        audio: AUDIOS.snoring,
        volume: 0.45664
    },
    collect_coin: {
        audio: AUDIOS.collect_coin,
        volume: 0.5
    },
    quiet_chicken: {
        audio: AUDIOS.CHICKEN_SOUND[0],
        volume: 1
    },
    loud_chicken: {
        audio: AUDIOS.CHICKEN_SOUND[1],
        volume: 0.7
    },
    hurt1: {
        audio: AUDIOS.HURT_SOUNDS[0],
        volume: 1
    },
    hurt2: {
        audio: AUDIOS.HURT_SOUNDS[1],
        volume: 1
    },

}

const masterAudio = {
    setVolume(volume) {
        Object.values(audio_settings).forEach(setting => {
            setting.audio.volume = setting.volume * volume;
        });
    }
};


