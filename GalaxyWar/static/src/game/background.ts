import { Scene } from "./scene.js";

export class Background extends Phaser.GameObjects.TileSprite {

    private speedUp: boolean = false;
    minVelY: number = 5;
    maxVelY: number = 20;
    velY: number = 5;

    constructor(scene: Phaser.Scene) {
        super(scene, Scene.WIDTH/2, Scene.HEIGHT/2, Scene.WIDTH, Scene.HEIGHT, "background");
        this.setScrollFactor(0, 0);
    }

    setSpeedUp(value: boolean) {
        this.speedUp = value;
    }

    move() {
        this.tilePositionY -= this.velY;

        if (this.speedUp) {
            if (this.velY < this.maxVelY) {
                this.velY += 1;
            }
        } else {
            if (this.velY > this.minVelY) {
                this.velY -= 1;
            }
        }

    }
}