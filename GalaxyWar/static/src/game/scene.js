import { GameConfig, GameState, State } from "../main.js";
import { Game } from "./game.js";
/// <reference path='../lib/phaser.d.ts'/>
export class Scene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image("background", "static/assets/backgrounds/" + GameConfig.background.BACKGROUND + ".png");
        var spaceship = GameConfig.spaceship.IMAGE_SRC;
        //load spaceship
        this.load.image("spaceship", "static/" + spaceship);
        //load flame
        this.load.spritesheet("flame", "static/assets/flames/blue/1.png", { frameWidth: 40, frameHeight: 150, spacing: 2 });
        //load bullet
        this.load.spritesheet("bullet", "static/assets/bullets/red/" + GameConfig.bullet.BULLET + ".png", { frameWidth: GameConfig.bullet.Data.w, frameHeight: GameConfig.bullet.Data.h, spacing: 2 });
        // load shot audio
        this.load.audio("shot", "static/assets/audio/shot.mp3");
        // load game audio
        this.load.audio("game-music", "static/assets/audio/game-music.ogg");
    }
    create() {
        this.myGame = new Game(this);
        this.add.existing(this.myGame);
        this.muteChecker = document.getElementById("volume-down-up");
        this.musicVolume = document.getElementById("game-audio-volume");
        this.gameMusic = this.sound.add("game-music", {
            loop: true,
            volume: parseInt(this.musicVolume.value) / 100,
            mute: this.muteChecker.checked ? true : false
        });
        this.gameMusic.play();
        this.muteChecker.onchange = () => {
            if (this.muteChecker.checked) {
                this.gameMusic.setMute(true);
            }
            else {
                this.gameMusic.setMute(false);
            }
        };
        this.musicVolume.onchange = () => {
            var volume = parseInt(this.musicVolume.value) / 100;
            this.gameMusic.setVolume(volume);
        };
        var newGameBtn = document.getElementById("new-game-btn");
        newGameBtn.onclick = () => {
            GameState.GAME_STATE = State.NEW_GAME;
        };
    }
    update() {
        if (GameState.GAME_STATE == State.RUNNING) {
            this.myGame.update();
        }
        else if (GameState.GAME_STATE == State.NEW_GAME) {
            this.myGame.destroy(true);
            this.myGame = new Game(this);
            this.add.existing(this.myGame);
            GameState.GAME_STATE = State.RUNNING;
        }
    }
}
Scene.WIDTH = innerWidth;
Scene.HEIGHT = innerHeight;
