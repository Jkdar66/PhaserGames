import { GameConfig, GameState, State } from "../main.js";
import { Camera } from "./camera.js";
import { Game } from "./game.js";

/// <reference path='../lib/phaser.d.ts'/>

export class Scene extends Phaser.Scene {

    static WIDTH: number = innerWidth;
    static HEIGHT: number = innerHeight;

    camera: Camera;
    myGame: Game;
    background: Phaser.GameObjects.TileSprite;

    gameMusic: Phaser.Sound.HTML5AudioSound;
    button: Phaser.GameObjects.Rectangle;
    muteChecker: HTMLInputElement;
    soundVolume: HTMLInputElement;

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }

    preload() {
        this.load.image("background", "static/assets/backgrounds/" + GameConfig.background.BACKGROUND + ".png");

        var spaceship = GameConfig.spaceship.IMAGE_SRC;
        //load spaceship
        this.load.image("spaceship", "static/" + spaceship);

        //load flame
        this.load.spritesheet("flame", "static/assets/flames/blue/1.png",
            { frameWidth: 40, frameHeight: 150, spacing: 2 });

        //load bullet
        this.load.spritesheet("bullet", "static/assets/bullets/red/" + GameConfig.bullet.BULLET + ".png",
            { frameWidth: GameConfig.bullet.Data.w, frameHeight: GameConfig.bullet.Data.h, spacing: 2 });

        /* Soundeffect */
        // load shot audio
        this.load.audio("shot", "static/assets/audio/shot2.mp3");

        /* Game Music */
        // load game audio
        this.load.audio("game-music", "static/assets/audio/game-music.ogg");
    }
    create() {
        this.myGame = new Game(this);
        this.add.existing(this.myGame);

        this.muteChecker = <HTMLInputElement> document.getElementById("music-mute");
        this.soundVolume = <HTMLInputElement> document.getElementById("music-volume");

        this.gameMusic = <Phaser.Sound.HTML5AudioSound>this.sound.add("game-music", {
            loop: true,
            volume: parseInt(this.soundVolume.value) / 100,
            mute: this.muteChecker.checked ? true : false
        });

        this.gameMusic.play();

        this.muteChecker.onchange = () => {
            this.gameMusic.setMute(!this.gameMusic.mute);
        }
        this.soundVolume.onchange = () => {
            var volume = parseInt(this.soundVolume.value) / 100;
            this.gameMusic.setVolume(volume);
        }

        var newGameBtn = document.getElementById("new-game-btn");
        newGameBtn.onclick = () => {
            GameState.GAME_STATE = State.NEW_GAME;
        }
    }
    update() {
        if (GameState.GAME_STATE == State.RUNNING) {
            this.myGame.update();
        } else if (GameState.GAME_STATE == State.NEW_GAME) {
            this.myGame.destroy(true);
            this.myGame = new Game(this);
            this.add.existing(this.myGame);
            GameState.GAME_STATE = State.RUNNING;
        }
    }
}
