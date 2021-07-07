/// <reference path='../../lib/phaser.d.ts'/>
export class Player extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
        this.bullets = [];
        this.game = this.scene.game;
        const GAME_WIDTH = parseFloat(this.game.config.width.toString());
        const GAME_HEIGHT = parseFloat(this.game.config.height.toString());
        this.width = 100;
        this.height = 100;
        this.x = (GAME_WIDTH - this.width) / 2;
        this.y = GAME_HEIGHT - this.height * 1.5;
        const radius = this.width / 4;
        this.fillStyle(0xff00ff);
        this.fillRoundedRect(0, 0, this.width, this.height, radius);
        this.scene.input.addListener("pointerdown", () => {
            this.bullets.push(new Bullet(this));
        });
        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "Space":
                    this.bullets.push(new Bullet(this));
                    break;
            }
        });
        this.scene.input.addListener("pointermove", (e) => {
            if (e.x > this.height / 1.5 && e.x < GAME_WIDTH - this.height / 1.5) {
                this.x = e.x - this.width / 2;
            }
        });
    }
    update() {
        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            bullet.update();
            if (bullet.y + bullet.height < 0) {
                this.bullets.splice(i, 1);
                bullet.destroy(true);
            }
        }
    }
}
export class Bullet extends Phaser.GameObjects.Graphics {
    constructor(player) {
        super(player.scene);
        this.velY = 15;
        this.width = player.width * 0.1;
        this.height = player.height * 0.5;
        this.x = player.x + player.width / 2 - this.width / 2;
        this.y = player.y;
        const radius = this.width / 2;
        this.depth = -1000;
        this.fillStyle(0x00ff00);
        this.fillRoundedRect(0, 0, this.width, this.height, radius);
        player.scene.add.existing(this);
    }
    update() {
        this.y -= this.velY;
    }
}
