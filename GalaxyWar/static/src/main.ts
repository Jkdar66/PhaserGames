// /// <reference path='/lib/phaser.d.ts'/>

import { Scene } from "./game/scene.js";

var config: Phaser.Types.Core.GameConfig;
var game: Phaser.Game;


export enum State {
    PAUSED, RUNNING, PLAYING, SETTING
}
export class GameState {
    static GAME_STATE: number = State.SETTING;
}

export class Spaceship {
    static SPACESHIP: number = 0;
}
export class Bullet {
    static BULLET: number;
}

export class GameConfig {
    gameState: GameState;
}

class Main {

    config: Phaser.Types.Core.GameConfig;
    game: Phaser.Game;
    scene: Scene;

    constructor() {
        this.config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.RESIZE,
                parent: 'phaser-example',
                width: '100%',
                height: '100%'
            },
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 5 },
                    debug: false
                }
            },
            scene: new Scene(""),
            banner: true,
            title: ''
        };
    }

    initGame() {
        this.game = new Phaser.Game(this.config);
    }

    main() {

    }
}

var gui = document.getElementById("gui");
var myGame = document.getElementById("game");
var playBtn = document.getElementById("play-btn");
var settingBtn = document.getElementById("setting-btn");
var spaceships = document.getElementsByClassName("spaceships-target");

playBtn.onclick = () => {
    gui.style.display = "none";
    myGame.style.display = "block";
    if(GameState.GAME_STATE != State.PAUSED) {
        var main = new Main();
        main.initGame();
    }
    GameState.GAME_STATE = State.RUNNING;
}
settingBtn.onclick = () => {
    gui.style.display = "block";
    myGame.style.display = "none";
    GameState.GAME_STATE = State.PAUSED;
}

function getSpaceship() {
    for (let i = 0; i < spaceships.length; i++) {
        const spaceship = spaceships[i] as HTMLFormElement;
        spaceship.addEventListener("change", () => {
            var num = "";
            for (let i = 0; i < spaceship.id.length; i++) {
                const char = spaceship.id[i];
                if(parseInt(char)) {
                    num += char;
                }
            }
            Spaceship.SPACESHIP = parseInt(num);
        });
    }
}

getSpaceship();