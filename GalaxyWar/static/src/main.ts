/// <reference path='../lib/phaser.d.ts'/>

import { Scene } from "./game/scene.js";
import { BulletData, Bullets } from "./type/bulletType.js";
import { SpaceshipData, Spaceships } from "./type/spaceshipType.js";

export enum State {
    PAUSED, RUNNING, PLAYING, SETTING, NEW_GAME
}
export class GameState {
    static GAME_STATE: number = State.SETTING;
}

class Spaceship {
    static SPACESHIP: number = 0;
    static Data: SpaceshipData = Spaceships[Spaceship.SPACESHIP];
    static IMAGE_SRC: string = "assets/spaceships/0/0.png";
}
class Bullet {
    static BULLET: number = 0;
    static Data: BulletData = Bullets[Bullet.BULLET];
}
class Background {
    static BACKGROUND: number = 0;
}

export const GameConfig = {
    gameState: GameState,
    spaceship: Spaceship,
    bullet: Bullet,
    background: Background
}

export class Main {
    config: Phaser.Types.Core.GameConfig;
    game: Phaser.Game;
    scene: Scene;

    static WIDTH = 2560;
    static HEIGHT = 1329;
    static SCALE = innerWidth / Main.WIDTH;

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
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: new Scene(""),
            banner: true,
            title: 'Galaxy War'
        };
    }

    initGame() {
        var newGameBtn = document.getElementById("new-game-btn");
        this.game = new Phaser.Game(this.config);

        // newGameBtn.onclick = () => {
        //     this.game.destroy(false);
        // }
    }
}

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

playBtn.onclick = function() {
    gui.style.display = "none";
    myGame.style.display = "block";
    if (GameState.GAME_STATE != State.PAUSED) {
        var main = new Main();
        main.initGame();
    }
    GameState.GAME_STATE = State.RUNNING;
    pauseGame();
}

settingBtn.onclick = () => {
    GameState.GAME_STATE = State.PAUSED;
}
continueBtn.onclick = () => {
    GameState.GAME_STATE = State.RUNNING;
}

for (let i = 0; i < gameConfigCloseBtns.length; i++) {
    const btn = <HTMLButtonElement> gameConfigCloseBtns[i];
    btn.onclick = () => {
        GameState.GAME_STATE = State.RUNNING;
    }
}

function pauseGame() {
    //disable all cards
    var gameCards = document.getElementsByClassName("game-card");
    for (let i = 0; i < gameCards.length; i++) {
        const spaceship = gameCards[i] as HTMLInputElement;
        spaceship.disabled = true;
    }
}

declare type Component = "Spaceship" | "SpaceshipColors" | "Bullet" | "Background";
function getIndex(list: HTMLCollectionOf<Element>, type: Component) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i] as HTMLInputElement;
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
                        const ship = ships[i] as HTMLInputElement;
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