/// <reference path='../lib/phaser.d.ts'/>
import { Scene } from "./game/scene.js";
var config;
var game;
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
    };
    game = new Phaser.Game(config);
}
function main() {
    init();
}
var option = document.getElementById("option");
var optnCloseBtn = document.getElementById("option-close-btn");
var gui = document.getElementById("gui");
var startBtn = document.getElementById("play-btn");
var optionBtn = document.getElementById("option-btn");
startBtn.onclick = () => {
    gui.style.display = "none";
    main();
};
optionBtn.onclick = () => {
    option.style.display = "block";
};
optnCloseBtn.onclick = () => {
    option.style.display = "none";
};
