import { Enemies } from "./enemy.js";
import { Player } from "./player.js";

export declare type Node = Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite | Phaser.GameObjects.Rectangle | Phaser.GameObjects.Image;

export class Collision {

    player: Player;
    enemies: Enemies;

    constructor(player: Player, enemies: Enemies) {
        this.player = player;
        this.enemies = enemies;
    }

    getPos(node: Node) {
        const x = node.getWorldTransformMatrix().tx;
        const y = node.getWorldTransformMatrix().ty;
        const hw = node.displayWidth / 2;
        const hh = node.displayHeight / 2;
        return { x1: x - hw, y1: y - hh, x2: x + hw, y2: y + hh };
    }

    detect() {
        const player = this.player.spaceShip;
        const plyPos = this.getPos(player);
        const bullets = this.player.bullets;
        const enemies = this.enemies.children;

        outer:
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            const enemySkin = enemy.skin;
            const enmPos = this.getPos(enemySkin);

            for (let j = bullets.length - 1; j >= 0; j--) {
                const bullet = bullets[j];
                const bltX = bullet.getWorldTransformMatrix().tx;
                const bltY = bullet.getWorldTransformMatrix().ty;

                if (bltX < enmPos.x2 && bltX > enmPos.x1 && bltY < enmPos.y2 && bltY > enmPos.y1) {

                    bullet.destroy();
                    bullets.splice(j, 1);

                    enemy.remainLife -= 10;
                    enemy.lifeBar.displayWidth = enemySkin.displayWidth * enemy.remainLife / 100;
                    enemy.lifeBar.x = enemySkin.x - (enemySkin.displayWidth - enemy.lifeBar.displayWidth)/2;

                    if (enemy.remainLife == 0) {
                        enemy.destroy();
                        enemies.splice(i, 1);
                        var row = enemy.row;
                        var column = enemy.column;
                        this.enemies.grid[row][column] = 0;
                        continue outer;
                    }
                }
            }

            if (plyPos.x1 < enmPos.x2 && plyPos.x2 > enmPos.x1 && plyPos.y1 < enmPos.y2 && plyPos.y2 > enmPos.y1) {
                this.player.scene.game.scene.pause(this.player.scene);
            }
        }
    }
}
