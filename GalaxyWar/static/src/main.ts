// /// <reference path='/lib/phaser.d.ts'/>

import { Scene } from "./game/scene.js";

enum GameState {
    PAUSED, RUNNING, PLAYED, SETTING
}


var config: Phaser.Types.Core.GameConfig;
var game: Phaser.Game;
var gameState: number = GameState.SETTING;

function init() {

    config = {
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
    }

    game = new Phaser.Game(config);
}

function main() {
    init();
}

// main();

var gui = document.getElementById("gui");
var myGame = document.getElementById("game");
var playBtn = document.getElementById("play-btn");
var settingBtn = document.getElementById("setting-btn");
var spaceships = document.getElementsByClassName("spaceships-target");

playBtn.onclick = () => {
    gui.style.display = "none";
    myGame.style.display = "block";
    if(gameState != GameState.PAUSED) {
        main();
    }
    gameState = GameState.RUNNING;
}
settingBtn.onclick = () => {
    gui.style.display = "block";
    myGame.style.display = "none";
    gameState = GameState.PAUSED;
}

function getSpaceship() {
    for (let i = 0; i < spaceships.length; i++) {
        const spaceship = spaceships[i] as HTMLFormElement;
        spaceship.addEventListener("change", () => {
            console.log(spaceship);
        });
    }
}