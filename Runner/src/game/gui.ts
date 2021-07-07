export class Gui extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene);
        // Phaser.GameObjects.
    }
}

export class Button extends Phaser.GameObjects.DynamicBitmapText {
    constructor(scene: Phaser.Scene, x: number, y: number, font: string, text?: string | string[]) {
        super(scene, x, y, font, text);
        // this.setTint()
    }
}
