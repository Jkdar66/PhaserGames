import { GameConfig, GameState, State } from "../main.js";
import { Camera } from "./camera.js";
import { Game } from "./game.js";

export class Scene extends Phaser.Scene{

    static WIDTH: number = innerWidth;
    static HEIGHT: number = innerHeight;

    camera: Camera;
    myGame: Game;
    background: Phaser.GameObjects.TileSprite;

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }

    preload() {
        this.load.image("background", "static/assets/backgrounds/" + GameConfig.background.BACKGROUND + ".png");

        var spaceship = "all/" + GameConfig.spaceship.SPACESHIP + ".png";
        //load spaceship
        this.load.image("spaceship", "static/assets/spaceships/" + spaceship);

        //load flame
        this.load.spritesheet("flame", "static/assets/flames/blue/1.png",
        {frameWidth: 40, frameHeight: 150, spacing: 2});
        
        //load bullet
        this.load.spritesheet("bullet", "static/assets/bullets/red/" + GameConfig.bullet.BULLET + ".png", 
        {frameWidth: GameConfig.bullet.Data.w, frameHeight: GameConfig.bullet.Data.h, spacing: 2});
        
    }
    create() {
        this.myGame = new Game(this);
        this.add.existing(this.myGame);
    }
    update() {
        if(GameState.GAME_STATE == State.RUNNING) {
            this.myGame.update();
        }
    }
}
