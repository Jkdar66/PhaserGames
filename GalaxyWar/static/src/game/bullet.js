export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "bullet");
        var config = {
            key: 'bulletAnimi',
            frames: scene.anims.generateFrameNumbers("bullet", { start: 0, end: 9, first: 0 }),
            frameRate: 30,
            repeat: -1
        };
        scene.anims.create(config);
        scene.add.existing(this);
        this.play("bulletAnimi");
    }
    move() {
        this.y -= 15;
    }
}
