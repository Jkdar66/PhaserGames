import { Scene } from "./scene.js";
export class Camera extends Phaser.Cameras.Scene2D.Camera {
    constructor(scene) {
        super(0, 0, Scene.WIDTH, Scene.HEIGHT);
        this.setScroll(0, 0);
    }
    move() {
        this.scrollY += Camera.CAM_VELY;
    }
}
Camera.CAM_VELX = 1;
Camera.CAM_VELY = 1;
