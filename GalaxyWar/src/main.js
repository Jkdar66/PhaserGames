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
var shop = document.getElementById("shop");
var option = document.getElementById("option");
var gui = document.getElementById("gui");
var startBtn = document.getElementById("play-btn");
var shopBtn = document.getElementById("shop-btn");
var optionBtn = document.getElementById("option-btn");
var popUpWindow = document.getElementsByClassName("pop-up");
var closeBtns = document.getElementsByClassName("close");
for (let i = 0; i < closeBtns.length; i++) {
    const elem = closeBtns.item(i);
    const popUp = popUpWindow.item(i);
    elem.onclick = () => {
        popUp.style.display = "none";
    };
}
startBtn.onclick = () => {
    gui.style.display = "none";
    main();
};
shopBtn.onclick = () => {
    shop.style.display = "block";
};
optionBtn.onclick = () => {
    option.style.display = "block";
};
