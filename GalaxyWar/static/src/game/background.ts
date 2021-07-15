import { Camera } from "./camera.js";
import { Scene } from "./scene.js";

export class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene: Phaser.Scene) {
        super(scene, Scene.WIDTH/2, Scene.HEIGHT/2, Scene.WIDTH, Scene.HEIGHT, "background");
        this.setScrollFactor(0, 0);
    }
    move() {
        this.tilePositionY -= Camera.CAM_VELY;
    }
}