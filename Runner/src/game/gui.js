export class Gui extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        // Phaser.GameObjects.
    }
}
export class Button extends Phaser.GameObjects.DynamicBitmapText {
    constructor(scene, x, y, font, text) {
        super(scene, x, y, font, text);
        // this.setTint()
    }
}
