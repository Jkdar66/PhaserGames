import { Bullet } from "./bullet.js";
import { Scene } from "./scene.js";
import { SPACESHIP, SpaceshipData } from "../type.js";
import { GameState, Spaceship, State } from "../main.js";

export class Player extends Phaser.GameObjects.Container {

    spaceShip: Phaser.GameObjects.Image;
    player: Phaser.GameObjects.Container;
    shield: Shield;
    flames: Phaser.GameObjects.Sprite[] = [];
    bullets: Bullet[] = [];
    bulletTime: Date = new Date();
    spaceshipData: SpaceshipData;
    maxBulletsNums: number = Infinity;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.spaceshipData = SPACESHIP[Spaceship.SPACESHIP];

        this.player = new Phaser.GameObjects.Container(scene);

        this.spaceShip = new Phaser.GameObjects.Image(scene, 0, 0, "spaceship");
        this.spaceShip.displayWidth *= 0.7; // scale width of spaceship with faktor 0.7
        this.spaceShip.displayHeight *= 0.7; // scale height of spaceship with faktor 0.7
        
        this.player.add(this.spaceShip);

        //create Flame
        var config = {
            key: 'flameAnimi',
            frames: scene.anims.generateFrameNumbers("flame", { start: 0, end: 299, first: 0 }),
            frameRate: 60,
            repeat: -1
        };
        scene.anims.create(config);

        const FlameData = this.spaceshipData.flame; // data of flame which is used
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
        scene.input.on("pointerdown", () => {
            genarateBullet();
        });
        scene.input.keyboard.on('keydown', (e: KeyboardEvent) => {
            if(e.code == "Space") {
                genarateBullet();
            }
        });
        const self = this;
        function genarateBullet(): void{
            if(GameState.GAME_STATE == State.RUNNING) {
                const BulletData = self.spaceshipData.bullet; // data of flame which is used
                if(self.bullets.length - 1 >= self.maxBulletsNums) { return }
                var time = new Date().getTime() - self.bulletTime.getTime();
                if(time >= 150) {
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
                    self.bulletTime = new Date();
                    return;
                }
            }
        }

        // move player right or left
        var marginRL = 10; // distance to lefft right and left of scene
        scene.input.on("pointermove", (e: Phaser.Input.Pointer) => {
            var mx1 = e.x - this.spaceShip.displayWidth/2;
            var mx2 = e.x + this.spaceShip.displayWidth/2;
            if(mx1 > marginRL && mx2 < Scene.WIDTH - marginRL) {
                this.player.x = e.x - this.x;
            }
        });

        function moveLeft(velxX: number) {
            var x = self.player.x - velxX;
            var minX = -(Scene.WIDTH/2 - self.spaceShip.displayWidth/2) + marginRL;
            if(x > minX) {
                self.player.x -= velxX;
            }
            if(x < minX) {
                self.player.x = minX;
            }
        }
        function moveRight(velxX: number) {
            var x = self.player.x + velxX;
            var maxX = Scene.WIDTH/2 - self.spaceShip.displayWidth/2 - marginRL;
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
                    moveRight(50);
                    break;
                case "ArrowLeft":
                    moveLeft(50);
                    break;
            }
        });

        this.add(this.player);
        
        var marginBottom = 50;
        this.x = Scene.WIDTH/2;
        this.y = Scene.HEIGHT - this.spaceShip.displayHeight/2 - marginBottom;
        this.setScrollFactor(0, 0);
    }

    static setSpaceshipData(index: number) {
        
        // this.spaceshipData = SPACESHIP[Spaceship.SPACESHIP];
    }


    move() {
        this.bullets.forEach(bullet => {
            bullet.move();
        });
    }
}

class Shield extends Phaser.GameObjects.Graphics {
    constructor(scene: Phaser.Scene, radius?: number) {
        super(scene);
        this.lineStyle(2, 0xff0000);
        this.beginPath();
        this.arc(0, -radius, radius, 0, Math.PI, true);
        this.stroke();
    }
}
