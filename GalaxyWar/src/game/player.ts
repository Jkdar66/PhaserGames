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

        const SpaceshipData = SPACESHIP.blue[9];

        this.player = new Phaser.GameObjects.Container(scene);

        this.spaceShip = new Phaser.GameObjects.Image(scene, 0, 0, "spaceship");
        this.spaceShip.displayWidth *= 0.7; // scale width of spaceship with faktor 0.5
        this.spaceShip.displayHeight *= 0.7; // scale height of spaceship with faktor 0.5
        
        this.player.add(this.spaceShip);

        //create Flame
        var config = {
            key: 'flameAnimi',
            frames: scene.anims.generateFrameNumbers("flame", { start: 0, end: 299, first: 0 }),
            frameRate: 60,
            repeat: -1
        };
        scene.anims.create(config);

        const FlameData = SpaceshipData.flame; // data of flame which is used
        const WIDTH = this.spaceShip.displayWidth/2; // half width of spaceship
        const HEIGHT = this.spaceShip.displayHeight/2; // half height of spaceship

        for (let i = 0; i < FlameData.x.length; i++) {
            var x = FlameData.x[i] * WIDTH /100; // x of flame
            var y = FlameData.y[i] * HEIGHT /100; // y of flame
            var flame = new Phaser.GameObjects.Sprite(scene, x, y, "flame");
            flame.displayWidth *= 0.5; // scale width of flame with faktor 0.5
            flame.displayHeight *= 0.5; // scale height of flame with faktor 0.5
            this.flames.push(flame);
            this.flames[i].y += this.flames[i].displayHeight/2;
        }

        this.flames.forEach(flame => {
            flame.play("flameAnimi");
            this.player.addAt(flame, 0);
            scene.add.existing(flame);
        });

        //genarate bullet
        const BulletData = SpaceshipData.bullet; // data of flame which is used
        scene.input.on("pointerdown", () => {
            genarateBullet()
        });
        scene.input.keyboard.on('keyup', (e: KeyboardEvent) => {
            if(e.code == "Space") {
                genarateBullet();
            }
        });
        const self = this;
        function genarateBullet(): void{
            //create Bullet
            for (let i = 0; i < BulletData.x.length; i++) {
                var x = BulletData.x[i] * WIDTH /100 + self.player.x;
                var y = BulletData.y[i] * HEIGHT /100;
    
                var blt = new Bullet(self.scene, x, y);
                blt.displayWidth *= 0.5;
                blt.displayHeight *= 0.5;
                self.bullets.push(blt);
                self.addAt(blt, 0);
            }
        }

        // move player right or left
        scene.input.on("pointermove", (e: Phaser.Input.Pointer) => {
            var mx1 = e.x - this.spaceShip.displayWidth/2;
            var mx2 = e.x + this.spaceShip.displayWidth/2;
            if(mx1 > 0 && mx2 < Scene.WIDTH) {
                this.player.x = e.x - this.x;
            }
        });

        function moveLeft(velxX: number) {
            if(self.player.x > 0) {
                self.player.x -= velxX;
            }
            if(self.player.x < 0) {
                self.player.x = 0;
            }
        }
        function moveRight(velxX: number) {
            var x = self.player.x;
            var maxX = Scene.WIDTH/2 + self.player.displayWidth/2;
            if(x < maxX) {
                self.player.x += velxX;
            }
            if(x > maxX) {
                self.player.x = maxX;
            }
        }
        scene.input.keyboard.on('keydown', (e: KeyboardEvent) => {  
            switch(e.code) {
                case "ArrowRight":
                    moveRight(10);
                    break;
                case "ArrowLeft":
                    moveLeft(10);
                    break;
            }
        });


        this.add(this.player);
        
        var marginBottom = 50;
        this.x = Scene.WIDTH/2;
        this.y = Scene.HEIGHT - this.spaceShip.displayHeight/2 - marginBottom;
        this.setScrollFactor(0, 0);
    }

    move() {
        this.bullets.forEach(bullet => {
            bullet.move();
        });
    }
}