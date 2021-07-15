import { Button } from "./button.js";

export class Gui extends Phaser.GameObjects.Container {
    play: Button;
    pause: Button;
    setting: Button;
    shop: Button;
    center: Phaser.GameObjects.Rectangle;
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.center = new Phaser.GameObjects.Rectangle(scene, 0, 0);
    }
}

