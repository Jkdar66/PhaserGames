import { Camera } from "./camera.js";
import { Game } from "./game.js";
export class Scene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image("background", "../../assets/backgrounds/2.png");
        //load spaceship
        this.load.image("spaceship", "../../assets/spaceships/prime/1.png");
        //load flame
        this.load.spritesheet("flame", "../../assets/flames/blue/1.png", { frameWidth: 40, frameHeight: 150, spacing: 2 });
        //load bullet
        this.load.spritesheet("bullet", "../../assets/bullets/red/1.png", { frameWidth: 88, frameHeight: 92, spacing: 2 });
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
Scene.WIDTH = innerWidth;
Scene.HEIGHT = innerHeight;
