// /// <reference path='/lib/phaser.d.ts'/>

import { Scene } from "./game/scene.js";
import { BulletData, Bullets } from "./type/bulletType.js";
import { SpaceshipData, Spaceships } from "./type/spaceshipType.js";

export enum State {
    PAUSED, RUNNING, PLAYING, SETTING
}
export class GameState {
    static GAME_STATE: number = State.SETTING;
}

class Spaceship {
    static SPACESHIP: number = 0;
    static Data: SpaceshipData = Spaceships[Spaceship.SPACESHIP];
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
var spaceships = document.getElementsByClassName("spaceships");
var bullets = document.getElementsByClassName("bullets");
var backgrounds = document.getElementsByClassName("backgrounds");

playBtn.onclick = () => {
    gui.style.display = "none";
    myGame.style.display = "block";
    if(GameState.GAME_STATE != State.PAUSED) {
        var main = new Main();
        main.initGame();
    }
    GameState.GAME_STATE = State.RUNNING;
    pauseGame();
}

settingBtn.onclick = () => {
    gui.style.display = "block";
    myGame.style.display = "none";
    GameState.GAME_STATE = State.PAUSED;
}

function pauseGame() {
    //disable all cards
    var gameCards = document.getElementsByClassName("game-card");
    for (let i = 0; i < gameCards.length; i++) {
        const spaceship = gameCards[i] as HTMLInputElement;
        spaceship.disabled = true;
    }
}

declare type Component = "Spaceship" | "Bullet" | "Background";
function getIndex(list: HTMLCollectionOf<Element>, type: Component) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i] as HTMLInputElement;
        item.addEventListener("change", () => {
            var num = "";
            for (let i = 0; i < item.id.length; i++) {
                const char = item.id[i];
                if(parseInt(char)) {
                    num += char;
                }
            }
            var index = parseInt(num);
            switch(type) {
                case "Spaceship":
                    Spaceship.SPACESHIP = index;
                    Spaceship.Data = Spaceships[index];
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
getIndex(bullets, "Bullet");
getIndex(backgrounds, "Background");