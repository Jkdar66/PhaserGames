import { Button } from "./button.js";

export class Gui extends Phaser.GameObjects.Container {
    play: Button;
    pause: Button;
    setting: Button;
    shop: Button;
    constructor(scene: Phaser.Scene) {
        super(scene);
    }
}

