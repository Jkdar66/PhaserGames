// /// <reference path='/lib/phaser.d.ts'/>
import { Scene } from "./game/scene.js";
var config;
var game;
export var State;
(function (State) {
    State[State["PAUSED"] = 0] = "PAUSED";
    State[State["RUNNING"] = 1] = "RUNNING";
    State[State["PLAYING"] = 2] = "PLAYING";
    State[State["SETTING"] = 3] = "SETTING";
})(State || (State = {}));
export class GameState {
}
GameState.GAME_STATE = State.SETTING;
export class GameConfig {
}
class Main {
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
    if (GameState.GAME_STATE != State.PAUSED) {
        var main = new Main();
        main.initGame();
    }
    GameState.GAME_STATE = State.RUNNING;
};
settingBtn.onclick = () => {
    gui.style.display = "block";
    myGame.style.display = "none";
    GameState.GAME_STATE = State.PAUSED;
};
function getSpaceship() {
    for (let i = 0; i < spaceships.length; i++) {
        const spaceship = spaceships[i];
        spaceship.addEventListener("change", () => {
        });
    }
}
