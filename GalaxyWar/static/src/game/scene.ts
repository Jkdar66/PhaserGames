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
        this.load.image("background", "static/assets/backgrounds/2.png");

        //load spaceship
        this.load.image("spaceship", "static/assets/spaceships/all/2.png");

        //load flame
        this.load.spritesheet("flame", "static/assets/flames/blue/1.png",
        {frameWidth: 40, frameHeight: 150, spacing: 2});

        //load bullet
        this.load.spritesheet("bullet", "static/assets/bullets/red/10.png", 
        {frameWidth: 88, frameHeight: 236, spacing: 2});
        
        //load ui buttons
        this.load.image("play", "static/assets/gui/Buttons/BTNs/Play_BTN.png");
        this.load.image("playActive", "static/assets/gui/Buttons/BTNs_Active/Play_BTN.png");
    }
    create() {
        this.camera = new Camera(this);
        this.cameras.addExisting(this.camera);

        this.myGame = new Game(this);
        this.add.existing(this.myGame);
    }
    update() {
        // this.camera.move();
        this.myGame.update();
    }
}
