import { Scene } from "./scene.js";
export class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene) {
        super(scene, Scene.WIDTH / 2, Scene.HEIGHT / 2, Scene.WIDTH, Scene.HEIGHT, "background");
        this.speedUp = false;
        this.minVelY = 5;
        this.maxVelY = 20;
        this.velY = 5;
        this.setScrollFactor(0, 0);
    }
    setSpeedUp(value) {
        this.speedUp = value;
    }
    move() {
        this.tilePositionY -= this.velY;
        if (this.speedUp) {
            if (this.velY < this.maxVelY) {
                this.velY += 1;
            }
        }
        else {
            if (this.velY > this.minVelY) {
                this.velY -= 1;
            }
        }
    }
}
