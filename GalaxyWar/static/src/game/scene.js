import { GameState, Spaceship, State } from "../main.js";
import { Game } from "./game.js";
export class Scene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image("background", "static/assets/backgrounds/2.png");
        //load spaceship
        this.load.image("spaceship", "static/assets/spaceships/all/" + Spaceship.SPACESHIP + ".png");
        //load flame
        this.load.spritesheet("flame", "static/assets/flames/blue/1.png", { frameWidth: 40, frameHeight: 150, spacing: 2 });
        //load bullet
        this.load.spritesheet("bullet", "static/assets/bullets/red/10.png", { frameWidth: 88, frameHeight: 236, spacing: 2 });
        //load ui buttons
        this.load.image("play", "static/assets/gui/Buttons/BTNs/Play_BTN.png");
        this.load.image("playActive", "static/assets/gui/Buttons/BTNs_Active/Play_BTN.png");
    }
    create() {
        this.myGame = new Game(this);
        this.add.existing(this.myGame);
    }
    update() {
        if (GameState.GAME_STATE == State.RUNNING) {
            this.myGame.update();
        }
    }
}
Scene.WIDTH = innerWidth;
Scene.HEIGHT = innerHeight;
