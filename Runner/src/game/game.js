/// <reference path='../../lib/phaser.d.ts'/>
export class Player extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
        this.bullets = [];
        this.enemies = [];
        this.isKilled = false;
        this.game = this.scene.game;
        Player.GAME_WIDTH = parseFloat(this.game.config.width.toString());
        Player.GAME_HEIGHT = parseFloat(this.game.config.height.toString());
        this.width = 100;
        this.height = 100;
        this.x = (Player.GAME_WIDTH - this.width) / 2;
        this.y = Player.GAME_HEIGHT - this.height * 1.5;
        this.radius = this.width / 4;
        this.fillStyle(0xff00ff);
        this.fillRoundedRect(0, 0, this.width, this.height, this.radius);
        this.createEnemy = setInterval(() => {
            this.enemies.push(new Enemy(this, this.enemies));
        }, 3000);
        this.scene.input.addListener("pointerdown", () => {
            this.bullets.push(new Bullet(this));
        });
        this.setInteractive();
        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "Space":
                    this.bullets.push(new Bullet(this));
                    break;
            }
        });
        this.scene.input.addListener("pointermove", (e) => {
            if (e.x > this.height / 1.5 && e.x < Player.GAME_WIDTH - this.height / 1.5) {
                this.x = e.x - this.width / 2;
            }
        });
    }
    delete() {
        clearInterval(this.createEnemy);
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            enemy.delete();
            enemy.destroy(true);
        }
        this.enemies = [];
    }
    update() {
        if (!this.isKilled) {
            for (let i = 0; i < this.bullets.length; i++) {
                const bullet = this.bullets[i];
                bullet.update();
                if (bullet.y + bullet.height < 0) {
                    this.bullets.splice(i, 1);
                    bullet.destroy(true);
                    i--;
                }
            }
            for (let i = 0; i < this.enemies.length; i++) {
                const enemy = this.enemies[i];
                enemy.update();
                if (enemy.isKilled) {
                    enemy.destroy(true);
                    this.enemies.splice(i, 1);
                    clearInterval(enemy.createBullet);
                    enemy.removeBullets();
                    i--;
                }
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
        this.radius = this.width / 2;
        this.depth = -1000;
        this.fillStyle(0x00ff00);
        this.fillRoundedRect(0, 0, this.width, this.height, this.radius);
        player.scene.add.existing(this);
    }
    update() {
        this.y -= this.velY;
    }
}
export class Enemy extends Phaser.GameObjects.Graphics {
    constructor(player, enemies) {
        super(player.scene);
        this.bullets = [];
        this.velY = 1;
        this.isKilled = false;
        this.player = player;
        this.width = this.player.width;
        this.height = this.player.height;
        var maxX = Player.GAME_WIDTH - this.width;
        var maxY = Player.GAME_HEIGHT / 2 - this.height;
        this.x = Math.floor(Math.random() * (maxX - 0 + 1)) + 0;
        this.y = -Math.floor(Math.random() * (maxY - 0 + 1)) + 0;
        while (this.colliedEnemies(enemies)) {
            this.x = Math.floor(Math.random() * (maxX - 0 + 1)) + 0;
            this.y = -Math.floor(Math.random() * (maxY - 0 + 1)) + 0;
        }
        this.radius = this.width / 4;
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        this.fillStyle(parseInt(randomColor, 16));
        this.fillRoundedRect(0, 0, this.width, this.height, this.radius);
        this.lineStyle(1, 0xffffff);
        this.strokeRoundedRect(0, 0, this.width, this.height, this.radius);
        this.player.scene.add.existing(this);
        this.createBullet = setInterval(() => {
            if (this.y > 0) {
                this.bullets.push(new EnemyBullet(this, parseInt(randomColor, 16)));
            }
        }, 3000);
    }
    removeBullets() {
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].destroy(true);
            this.bullets.splice(i, 1);
            i--;
        }
    }
    colliedEnemies(enemies) {
        var selfPos = {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width,
            y2: this.y + this.height
        };
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const enemyPos = {
                x1: enemy.x,
                y1: enemy.y,
                x2: enemy.x + enemy.width,
                y2: enemy.y + enemy.height
            };
            if (selfPos.x2 >= enemyPos.x1 && selfPos.x1 <= enemyPos.x2 &&
                selfPos.y2 >= enemyPos.y1 && selfPos.y1 <= enemyPos.y2) {
                return true;
            }
        }
        return false;
    }
    collied() {
        for (let i = 0; i < this.player.bullets.length; i++) {
            const bullet = this.player.bullets[i];
            const bltPos = {
                x1: bullet.x,
                y1: bullet.y,
                x2: bullet.x + bullet.width,
                y2: bullet.y + bullet.height
            };
            const enemyPos = {
                x1: this.x,
                y1: this.y + this.radius / 2,
                x2: this.x + this.width,
                y2: this.y + this.height - this.radius / 2
            };
            if (bltPos.y1 < enemyPos.y2) {
                if (bltPos.x2 >= enemyPos.x1 && bltPos.x1 <= enemyPos.x2) {
                    this.alpha -= 0.1;
                    bullet.destroy(true);
                    this.player.bullets.splice(i, 1);
                    if (Math.floor(this.alpha * 10) / 10 <= 0) {
                        this.isKilled = true;
                    }
                    i--;
                }
            }
        }
    }
    bulletsColliedPlayer() {
        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            const bltPos = {
                x1: bullet.x,
                y1: bullet.y,
                x2: bullet.x + bullet.width,
                y2: bullet.y + bullet.height
            };
            const playerPos = {
                x1: this.player.x,
                y1: this.player.y + this.radius / 2,
                x2: this.player.x + this.player.width,
                y2: this.player.y + this.player.height - this.player.radius / 2
            };
            if (bltPos.y2 > playerPos.y1) {
                if (bltPos.x2 >= playerPos.x1 && bltPos.x1 <= playerPos.x2) {
                    this.player.alpha -= 0.1;
                    bullet.destroy(true);
                    this.bullets.splice(i, 1);
                    if (Math.floor(this.player.alpha * 10) / 10 <= 0) {
                        this.player.isKilled = true;
                    }
                    i--;
                }
            }
        }
    }
    delete() {
        clearInterval(this.createBullet);
        this.removeBullets();
    }
    update() {
        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            bullet.update();
            if (bullet.y > Player.GAME_HEIGHT) {
                this.bullets.splice(i, 1);
                bullet.destroy(true);
                i--;
            }
        }
        this.y += this.velY;
        this.collied();
        this.bulletsColliedPlayer();
    }
}
export class EnemyBullet extends Phaser.GameObjects.Graphics {
    constructor(enmey, color) {
        super(enmey.player.scene);
        this.velY = 15;
        this.width = enmey.width * 0.1;
        this.height = enmey.height * 0.5;
        this.x = enmey.x + enmey.width / 2 - this.width / 2;
        this.y = enmey.y;
        this.radius = this.width / 2;
        this.depth = -1000;
        this.fillStyle(color);
        this.fillRoundedRect(0, 0, this.width, this.height, this.radius);
        enmey.player.scene.add.existing(this);
    }
    update() {
        this.y += this.velY;
    }
}
