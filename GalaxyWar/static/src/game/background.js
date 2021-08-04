import { Scene } from "./scene.js";
export class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene) {
        super(scene, Scene.WIDTH / 2, Scene.HEIGHT / 2, Scene.WIDTH, Scene.HEIGHT, "background");
        this.setScrollFactor(0, 0);
    }
    move() {
        this.tilePositionY -= Background.VELY;
    }
}
Background.MIN_VELY = 5;
Background.MAX_VELY = 20;
Background.VELY = 5;
