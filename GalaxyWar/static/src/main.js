/// <reference path='../lib/phaser.d.ts'/>
import { Scene } from "./game/scene.js";
import { Bullets } from "./type/bulletType.js";
import { Spaceships } from "./type/spaceshipType.js";
export var State;
(function (State) {
    State[State["PAUSED"] = 0] = "PAUSED";
    State[State["RUNNING"] = 1] = "RUNNING";
    State[State["PLAYING"] = 2] = "PLAYING";
    State[State["SETTING"] = 3] = "SETTING";
    State[State["NEW_GAME"] = 4] = "NEW_GAME";
})(State || (State = {}));
export class GameState {
}
GameState.GAME_STATE = State.SETTING;
class Spaceship {
}
Spaceship.SPACESHIP = 0;
Spaceship.Data = Spaceships[Spaceship.SPACESHIP];
Spaceship.IMAGE_SRC = "assets/spaceships/0/0.png";
class Bullet {
}
Bullet.BULLET = 0;
Bullet.Data = Bullets[Bullet.BULLET];
class Background {
}
Background.BACKGROUND = 0;
export const GameConfig = {
    gameState: GameState,
    spaceship: Spaceship,
    bullet: Bullet,
    background: Background
};
export class Main {
    constructor() {
        this.config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: 'phaser-example',
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: innerWidth,
                height: innerHeight
            },
            audio: {
                disableWebAudio: true
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
}
Main.WIDTH = 2560;
Main.HEIGHT = 1329;
Main.SCALE = innerWidth / Main.WIDTH;
var gui = document.getElementById("gui");
var myGame = document.getElementById("game");
var playBtn = document.getElementById("play-btn");
var continueBtn = document.getElementById("continue-btn");
var gameConfigCloseBtns = document.getElementsByClassName("game-state-close");
var settingBtn = document.getElementById("setting-btn");
var spaceships = document.getElementsByClassName("spaceships-component");
var spaceshipsColors = document.getElementsByClassName("spaceships-colors");
var bullets = document.getElementsByClassName("bullets");
var backgrounds = document.getElementsByClassName("backgrounds");
playBtn.onclick = () => {
    gui.style.display = "none";
    myGame.style.display = "block";
    if (GameState.GAME_STATE != State.PAUSED) {
        var main = new Main();
        main.initGame();
    }
    GameState.GAME_STATE = State.RUNNING;
    pauseGame();
};
settingBtn.onclick = () => {
    GameState.GAME_STATE = State.PAUSED;
};
continueBtn.onclick = () => {
    GameState.GAME_STATE = State.RUNNING;
};
for (let i = 0; i < gameConfigCloseBtns.length; i++) {
    const btn = gameConfigCloseBtns[i];
    btn.onclick = () => {
        GameState.GAME_STATE = State.RUNNING;
    };
}
function pauseGame() {
    //disable all cards
    var gameCards = document.getElementsByClassName("game-card");
    for (let i = 0; i < gameCards.length; i++) {
        const spaceship = gameCards[i];
        spaceship.disabled = true;
    }
}
function getIndex(list, type) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        item.addEventListener("change", () => {
            var num = "";
            for (let i = 0; i < item.id.length; i++) {
                const char = item.id[i];
                if (!isNaN(parseInt(char))) {
                    num += char;
                }
            }
            var index = parseInt(num);
            switch (type) {
                case "Spaceship":
                    var label = document.getElementById("spaceships-label-" + index);
                    var ships = label.getElementsByClassName("spaceships-colors");
                    for (let i = 0; i < ships.length; i++) {
                        const ship = ships[i];
                        if (ship.checked) {
                            var indexs = ship.id.split("_")[1];
                            var i1 = parseInt(indexs.split("-")[0]);
                            var i2 = parseInt(indexs.split("-")[1]);
                            Spaceship.IMAGE_SRC = "assets/spaceships/" + i1 + "/" + i2 + ".png";
                            Spaceship.SPACESHIP = i1;
                            Spaceship.Data = Spaceships[i1];
                            break;
                        }
                    }
                    break;
                case "SpaceshipColors":
                    var indexs = item.id.split("_")[1];
                    var i1 = parseInt(indexs.split("-")[0]);
                    var i2 = parseInt(indexs.split("-")[1]);
                    Spaceship.IMAGE_SRC = "assets/spaceships/" + i1 + "/" + i2 + ".png";
                    Spaceship.SPACESHIP = i1;
                    Spaceship.Data = Spaceships[i1];
                    break;
                case "Bullet":
                    Bullet.BULLET = index;
                    Bullet.Data = Bullets[index];
                    break;
                case "Background":
                    Background.BACKGROUND = index;
                    break;
            }
        });
    }
}
getIndex(spaceships, "Spaceship");
getIndex(spaceshipsColors, "SpaceshipColors");
getIndex(bullets, "Bullet");
getIndex(backgrounds, "Background");
