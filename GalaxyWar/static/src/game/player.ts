import { GameConfig, GameState, State } from "../main.js";
import { Bullet } from "./bullet.js";
import { Scene } from "./scene.js";

export class Player extends Phaser.GameObjects.Container {

    spaceShip: Phaser.GameObjects.Image;
    player: Phaser.GameObjects.Container;
    flames: Phaser.GameObjects.Sprite[] = [];
    bullets: Bullet[] = [];
    bulletTime: Date = new Date();
    maxBulletsNums: number = Infinity;
    keys: {[key: string]: boolean} = {};

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.player = new Phaser.GameObjects.Container(scene);

        this.spaceShip = new Phaser.GameObjects.Image(scene, 0, 0, "spaceship");
        this.spaceShip.displayWidth *= 0.5; // scale width of spaceship with faktor 0.7
        this.spaceShip.displayHeight *= 0.5; // scale height of spaceship with faktor 0.7
        
        this.player.add(this.spaceShip);

        //create Flame
        var config = {
            key: 'flameAnimi',
            frames: scene.anims.generateFrameNumbers("flame", { start: 0, end: 299, first: 0 }),
            frameRate: 60,
            repeat: -1
        };
        scene.anims.create(config);

        const FlameData = GameConfig.spaceship.Data.flame; // data of flame which is used
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
            this.fireBullet();
        });
        //detect key inputs for move left or right, shooting
        scene.input.keyboard.on('keydown', (e: KeyboardEvent) => {
            e.preventDefault();
            this.keys[e.code] = true;
        });
        scene.input.keyboard.on('keyup', (e: KeyboardEvent) => {
            this.keys[e.code] = false;
        });

        // move player right or left
        var marginRL = 0; // distance to right and left of scene
        scene.input.on("pointermove", (e: Phaser.Input.Pointer) => {
            var mx1 = e.x - this.spaceShip.displayWidth/2;
            var mx2 = e.x + this.spaceShip.displayWidth/2;
            if(mx1 > marginRL && mx2 < Scene.WIDTH - marginRL) {
                this.player.x = e.x - this.x;
            }
        });

        // add the player to the main conatainer
        this.add(this.player);
        
        var marginBottom = 5; // space of spaceship to bottom
        const FLAME_WIDTH = this.flames[0].displayHeight; // get flame height to calculate with spaceship for bottom distance
        this.x = Scene.WIDTH/2; // set x-position to center of window
        this.y = Scene.HEIGHT - HEIGHT - FLAME_WIDTH - marginBottom;
    }
    
    fireBullet(): void{
        const WIDTH = this.spaceShip.displayWidth/2; // half width of spaceship
        const HEIGHT = this.spaceShip.displayHeight/2; // half height of spaceship
        if(GameState.GAME_STATE == State.RUNNING) {
            const BulletData = GameConfig.spaceship.Data.bullet; // data of flame which is used
            if(this.bullets.length - 1 >= this.maxBulletsNums) { return }
            var time = new Date().getTime() - this.bulletTime.getTime();
            if(time >= 150) { // detect if the planed time has been passed since the last bullet was fired
                //create Bullet
                for (let i = 0; i < BulletData.x.length; i++) {
                    var x = BulletData.x[i] * WIDTH /100 + this.player.x;
                    var y = BulletData.y[i] * HEIGHT /100;
        
                    var blt = new Bullet(this.scene, x, y);
                    blt.displayWidth *= 0.5;
                    blt.displayHeight *= 0.5;
                    this.bullets.push(blt);
                    this.addAt(blt, 0);
                }
                this.bulletTime = new Date(); // reseting old timer to the current time
            }
        }
    }
    moveLeft(velX: number) {
        var x = this.player.x;
        var minX = -(Scene.WIDTH/2 - this.spaceShip.displayWidth/2);// + marginRL;
        if(x > minX) {
            var restX = Math.abs(x - minX);
            if(restX < velX) { // delta-x between {{left}} window edge and spaceship
                velX = restX;
            }
            this.player.x -= velX;
        }
    }
    moveRight(velX: number) {
        var x = this.player.x;
        var maxX = Scene.WIDTH/2 - this.spaceShip.displayWidth/2;// - marginRL;
        if(x < maxX) {
            var restX = Math.abs(maxX - x);
            if(restX < velX) { // delta-x between {{right}} window edge and spaceship
                velX = restX;
            }
            this.player.x += velX;
        }
    }

    move() {
        this.bullets.forEach(bullet => {
            bullet.move();
        });
        
        if(this.keys["Space"]) {
            this.fireBullet();
        }
        if(this.keys["ArrowRight"]) {
            this.moveRight(10);
        } else if(this.keys["ArrowLeft"]) {
            this.moveLeft(10);
        }
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
