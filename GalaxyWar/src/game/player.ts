import { Bullet } from "./bullet.js";
import { Scene } from "./scene.js";
import { SPACESHIP } from "../type.js";

export class Player extends Phaser.GameObjects.Container {

    spaceShip: Phaser.GameObjects.Image;
    player: Phaser.GameObjects.Container;
    flames: Phaser.GameObjects.Sprite[] = [];
    bullets: Bullet[] = [];

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.x = Scene.WIDTH/2;
        this.y = Scene.HEIGHT/1.6;
        this.setScrollFactor(0, 0);

        this.player = new Phaser.GameObjects.Container(scene);

        this.spaceShip = new Phaser.GameObjects.Image(scene, 0, 0, "spaceship");
        this.player.add(this.spaceShip);

        //create Flame

        var config = {
            key: 'flameAnimi',
            frames: scene.anims.generateFrameNumbers("flame", { start: 0, end: 299, first: 0 }),
            frameRate: 60,
            repeat: -1
        };
        scene.anims.create(config);

        const FlameType = SPACESHIP.prime[1].flame;
        const WIDTH = this.spaceShip.displayWidth/2;
        const HEIGHT = this.spaceShip.displayHeight/2;

        for (let i = 0; i < FlameType.x.length; i++) {
            var x = FlameType.x[i] * WIDTH /100;
            var y = FlameType.y[i] * HEIGHT /100;
            this.flames.push(new Phaser.GameObjects.Sprite(scene, x, y, "flame"));
            this.flames[i].y += this.flames[i].displayHeight/2;
        }

        this.flames.forEach(flame => {
            flame.play("flameAnimi");
            this.player.addAt(flame, 0);
            scene.add.existing(flame);
        });

        const BulletType = SPACESHIP.prime[1].bullet;
        scene.input.on("pointerdown", () => {
            //create flame
            for (let i = 0; i < BulletType.x.length; i++) {
                var x = BulletType.x[i] * WIDTH /100 + this.player.x;
                var y = BulletType.y[i] * HEIGHT /100;

                var blt = new Bullet(scene, x, y);
                this.bullets.push(blt);
                this.addAt(blt, 0);
            }
        });

        scene.input.on("pointermove", (e: Phaser.Input.Pointer) => {
            var mx1 = e.x - this.spaceShip.displayWidth/2;
            var mx2 = e.x + this.spaceShip.displayWidth/2;
            if(mx1 > 0 && mx2 < Scene.WIDTH) {
                this.player.x = e.x - this.x;
            }
        });

        this.add(this.player);
    }

    move() {
        this.bullets.forEach(bullet => {
            bullet.move();
        });
    }
}