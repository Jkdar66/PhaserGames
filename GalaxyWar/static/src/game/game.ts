import { Background } from "./background.js";
import { Collision } from "./collision.js";
import { Enemies } from "./enemy.js";
import { Player } from "./player.js";

export class Game extends Phaser.GameObjects.Container {
    background: Background;
    player: Player;
    enemies: Enemies;
    collision: Collision;

    static KEYS: { [key: string]: boolean } = {};

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.background = new Background(scene);
        this.add(this.background);

        this.player = new Player(scene);
        this.add(this.player);

        this.enemies = new Enemies(scene);
        this.add(this.enemies);

        this.collision = new Collision(this.player, this.enemies);

        //detect key inputs for move left or right, shooting
        scene.input.keyboard.on('keydown', (e: KeyboardEvent) => {
            e.preventDefault();
            Game.KEYS[e.code] = true;
        });
        scene.input.keyboard.on('keyup', (e: KeyboardEvent) => {
            Game.KEYS[e.code] = false;
        });
    }

    update() {
        this.background.move();
        this.player.move();
        this.enemies.move();
        this.collision.detect();

        if (Game.KEYS["ArrowUp"]) {
            this.background.setSpeedUp(true);
            this.enemies.children.forEach(enemy => {
                enemy.setSpeedUp(true);
            });
        } else {
            this.background.setSpeedUp(false);
            this.enemies.children.forEach(enemy => {
                enemy.setSpeedUp(false);
            });
        }

    }
}