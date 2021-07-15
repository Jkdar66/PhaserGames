import { Background } from "./background.js";
import { Player } from "./player.js";
export class Game extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.background = new Background(scene);
        this.add(this.background);
        this.player = new Player(scene);
        this.add(this.player);
    }
    update() {
        this.background.move();
        this.player.move();
    }
}
