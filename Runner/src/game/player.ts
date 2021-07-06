/// <reference path='../../lib/phaser.d.ts'/>

export class Player extends Phaser.GameObjects.Rectangle {
    bullets: Bullet[] = [];
    game: Phaser.Game;
    velX: number;
    velY: number;

    constructor(scene: Phaser.Scene, x: number, y: number, w?: number, h?: number) {
        super(scene, x, y, w, h, 0, 1);

        this.game = this.scene.game;

        const GAME_WIDTH = parseFloat(this.game.config.width.toString());
        const GAME_HEIGHT = parseFloat(this.game.config.height.toString());

        this.y = GAME_HEIGHT - this.height;

        this.scene.input.addListener("pointerdown", () => {
            this.bullets.push(new Bullet(this));
        });
        window.addEventListener("keyup", (e) => {
            switch(e.code) {
                case "Space":
                    this.bullets.push(new Bullet(this));
                    break;
            }
        });

        this.scene.input.addListener("pointermove", (e: Phaser.Input.Pointer) => {
            if(e.x > this.height/1.5 && e.x < GAME_WIDTH - this.height/1.5) {
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

export class Bullet extends Phaser.GameObjects.Rectangle{
    velX: number;
    velY: number = 15;
    constructor(player: Player) {
        super(player.scene, 0, 0, 0, 0, 0, 1);
        this.width = player.width/10;
        this.height = player.height/3;
        this.x = player.x - this.width/2;
        this.y = player.y - player.height/2 - this.height;
        this.fillColor = 0xff0000;
        
        player.scene.add.existing(this);
    }

    update() {
        this.y -= this.velY;
    }
}
