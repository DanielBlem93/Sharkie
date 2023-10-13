/**
 * Configuration for different audio settings.
 */
const audio_settings = {

    title_song: {
        audio: AUDIOS.title_song,
        volume: 0.4
    },
    theme_song: {
        audio: AUDIOS.theme_song,
        volume: 0.4
    },
    boss_song: {
        audio: AUDIOS.boss_song,
        volume: 0.8
    },
    game_over: {
        audio: AUDIOS.game_over,
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
        volume: 0.7
    },
    jump_landing: {
        audio: AUDIOS.jump_landing_sound,
        volume: 0.8
    },
    snoring: {
        audio: AUDIOS.snoring,
        volume: 0.3
    },
    collect_coin: {
        audio: AUDIOS.collect_coin,
        volume: 0.4
    },
    collect_bottle: {
        audio: AUDIOS.blop,
        volume: 1
    },
    quiet_chicken: {
        audio: AUDIOS.CHICKEN_SOUND[0],
        volume: 0.2
    },
    loud_chicken: {
        audio: AUDIOS.CHICKEN_SOUND[1],
        volume: 0.2
    },
    chickenDeadSound: {
        audio: AUDIOS.CHICKEN_DEAD_SOUND,
        volume: 0.5
    },
    babyChicken: {
        audio: AUDIOS.babyChicken,
        volume: 0.2
    },
    BabyChickenDead: {
        audio: AUDIOS.BabyChickenDead,
        volume: 0.5
    },
    hurt1: {
        audio: AUDIOS.HURT_SOUNDS[0],
        volume: 1
    },
    hurt2: {
        audio: AUDIOS.HURT_SOUNDS[1],
        volume: 1
    },
    BossHurt: {
        audio: AUDIOS.BOSS_CHICKEN_HURT_SOUND,
        volume: 0.8
    },
    BossSound: {
        audio: AUDIOS.BOSS_CHICKEN_SOUND,
        volume: 0.6
    },
    BossAttack: {
        audio: AUDIOS.BOSS_CHICKEN_ATTACK_SOUND,
        volume: 0.3
    },
    BossWings: {
        audio: AUDIOS.BOSS_CHICKEN_WINGS,
        volume: 1
    },
}

/**
 * Master audio controller for setting the volume.
 */
const masterAudio = {
    /**
     * Sets the volume for all audio settings.
     * @param {number} volume - The volume level (0 to 1).
     */
    setVolume(volume) {
        Object.values(audio_settings).forEach(setting => {
            setting.audio.volume = setting.volume * volume;
        });
    }
};
