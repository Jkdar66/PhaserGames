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
        this.load.image("background", "../../assets/backgrounds/2.png");

        //load spaceship
        this.load.image("spaceship", "../../assets/spaceships/blue/9.png");

        //load flame
        this.load.spritesheet("flame", "../../assets/flames/blue/1.png", 
        {frameWidth: 40, frameHeight: 150, spacing: 2});

        //load bullet
        this.load.spritesheet("bullet", "../../assets/bullets/red/10.png", 
        {frameWidth: 88, frameHeight: 236, spacing: 2});
    }
    create() {
        this.camera = new Camera(this);
        this.cameras.addExisting(this.camera);

        this.myGame = new Game(this);
        this.add.existing(this.myGame);
    }
    update() {
        this.camera.move();
        this.myGame.update();
    }
}
