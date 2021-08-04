import { Scene } from "./scene.js";

export class Background extends Phaser.GameObjects.TileSprite {
    static MIN_VELY: number = 5;
    static MAX_VELY: number = 20;
    static VELY: number = 5;
    constructor(scene: Phaser.Scene) {
        super(scene, Scene.WIDTH/2, Scene.HEIGHT/2, Scene.WIDTH, Scene.HEIGHT, "background");
        this.setScrollFactor(0, 0);
    }
    move() {
        this.tilePositionY -= Background.VELY;
    }
}