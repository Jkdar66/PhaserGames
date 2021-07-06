/// <reference path='../../lib/phaser.d.ts'/>
export class Player extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, w, h) {
        super(scene, x, y, w, h, 0, 1);
        this.bullets = [];
        this.game = this.scene.game;
        const GAME_WIDTH = parseFloat(this.game.config.width.toString());
        const GAME_HEIGHT = parseFloat(this.game.config.height.toString());
        this.y = GAME_HEIGHT - this.height;
        this.scene.input.addListener("pointerdown", () => {
            this.bullets.push(new Bullet(this));
        });
        this.scene.input.addListener("pointermove", (e) => {
            if (e.x > this.height / 2 && e.x < GAME_WIDTH - this.height / 2) {
                this.x = e.x;
            }
        });
    }
    update() {
        this.bullets.forEach(bullet => {
            bullet.update();
        });
    }
}
export class Bullet extends Phaser.GameObjects.Rectangle {
    constructor(player) {
        super(player.scene, 0, 0, 0, 0, 0, 1);
        this.velY = 10;
        this.width = player.width / 10;
        this.height = player.height / 3;
        this.x = player.x - this.width / 2;
        this.y = player.y - player.height / 2 - this.height;
        this.fillColor = 0xff0000;
        player.scene.add.existing(this);
    }
    update() {
        this.y -= this.velY;
    }
}
