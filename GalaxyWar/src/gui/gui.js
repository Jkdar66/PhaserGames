export class Gui extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.center = new Phaser.GameObjects.Rectangle(scene, 0, 0);
    }
}
