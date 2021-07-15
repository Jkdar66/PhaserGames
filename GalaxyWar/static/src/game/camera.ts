import { Scene } from "./scene.js"

export class Camera extends Phaser.Cameras.Scene2D.Camera{
    static CAM_VELX: number = 1;
    static CAM_VELY: number = 1;
    constructor(scene: Phaser.Scene) {
        super(0, 0, Scene.WIDTH, Scene.HEIGHT);
        this.setScroll(0, 0);
    }

    move() {
        this.scrollY += Camera.CAM_VELY;
    }
}