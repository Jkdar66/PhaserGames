import { GameConfig, GameState, Main, State } from "../main.js";
import { Background } from "./background.js";
import { Bullet } from "./bullet.js";
import { Game } from "./game.js";
import { Scene } from "./scene.js";

export class Player extends Phaser.GameObjects.Container {

    player: Phaser.GameObjects.Container;
    spaceShip: Phaser.GameObjects.Image;
    flames: Phaser.GameObjects.Sprite[] = [];

    bullets: Bullet[] = [];
    bulletTime: Date = new Date();
    maxBulletsNums: number = Infinity;

    keys: { [key: string]: boolean } = {};
    marginRL: number = 10;

    muteChecker: HTMLInputElement;
    soundVolume: HTMLInputElement;
    shotSound: Phaser.Sound.HTML5AudioSound;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        // game sound
        this.muteChecker = <HTMLInputElement> document.getElementById("sound-effect-mute");
        this.soundVolume = <HTMLInputElement> document.getElementById("sound-effect-volume");
        this.shotSound = <Phaser.Sound.HTML5AudioSound>scene.sound.add("shot", {
            loop: false,
            volume: parseInt(this.soundVolume.value) / 100,
            mute: this.muteChecker.checked ? true : false
        });
        this.muteChecker.onchange = () => {
            this.shotSound.setMute(!this.shotSound.mute);
        }
        this.soundVolume.onchange = () => {
            var volume = parseInt(this.soundVolume.value) / 100;
            this.shotSound.setVolume(volume);
        }

        this.player = new Phaser.GameObjects.Container(scene, 0, 0);

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
        const WIDTH = this.spaceShip.displayWidth / 2; // half width of spaceship
        const HEIGHT = this.spaceShip.displayHeight / 2; // half height of spaceship

        for (let i = 0; i < FlameData.x.length; i++) {
            var x = FlameData.x[i] * WIDTH / 100; // x of flame
            var y = FlameData.y[i] * HEIGHT / 100; // y of flame
            var flame = new Phaser.GameObjects.Sprite(scene, x, y, "flame");
            flame.displayWidth *= 0.5; // scale width of flame with faktor 0.5
            flame.displayHeight *= 0.5; // scale height of flame with faktor 0.5
            this.flames.push(flame);
            this.flames[i].y += this.flames[i].displayHeight / 2;
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
        scene.input.on("pointermove", (e: Phaser.Input.Pointer) => {
            var mx1 = e.x - this.spaceShip.displayWidth / 2;
            var mx2 = e.x + this.spaceShip.displayWidth / 2;
            if (mx1 > this.marginRL && mx2 < Scene.WIDTH - this.marginRL) {
                this.player.x = e.x - this.x;
            }
        });

        // add the player to the main conatainer
        this.add(this.player);

        var marginBottom = 5; // space of spaceship to bottom
        const FLAME_WIDTH = this.flames[0].displayHeight; // get flame height to calculate with spaceship for bottom distance
        this.player.x = Scene.WIDTH / 2; // set the x-position to center of window
        this.player.y = Scene.HEIGHT - HEIGHT - FLAME_WIDTH - marginBottom;
    }

    fireBullet(): void {
        const WIDTH = this.spaceShip.displayWidth / 2; // half width of spaceship
        const HEIGHT = this.spaceShip.displayHeight / 2; // half height of spaceship
        const BulletData = GameConfig.spaceship.Data.bullet; // data of flame which is currently used
        // if (this.bullets.length - 1 >= this.maxBulletsNums) { return }
        var time = new Date().getTime() - this.bulletTime.getTime();
        if (time >= 150) { // detect if 150 ms has been passed since the last bullet was fired
            //create Bullet
            for (let i = 0; i < BulletData.x.length; i++) {
                var x = (BulletData.x[i] * WIDTH / 100) + this.player.x;
                var y = (BulletData.y[i] * HEIGHT / 100) + this.player.y;
                
                var blt = new Bullet(this.scene, x, y);
                blt.displayWidth *= 0.5;
                blt.displayHeight *= 0.5;
                this.bullets.push(blt);
                this.add(blt);
                
                this.shotSound.play();
            }
            this.bulletTime = new Date(); // reseting old timer to the current time
        }
    }

    moveLeft(velX: number) {
        var x = this.player.x;
        var minX = this.marginRL + this.spaceShip.displayWidth / 2;
        if (x > minX) {
            var restX = Math.abs(x - minX);
            if (restX < velX) { // delta-x between {{left}} window edge and spaceship
                velX = restX;
            }
            this.player.x -= velX;
        }
    }
    moveRight(velX: number) {
        var x = this.player.x;
        var maxX = Scene.WIDTH - this.spaceShip.displayWidth / 2 - this.marginRL;
        if (x < maxX) {
            var restX = Math.abs(maxX - x);
            if (restX < velX) { // delta-x between {{ right }} window edge and spaceship
                velX = restX;
            }
            this.player.x += velX;
        }
    }

    bulletsUpdate() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];

            var bltY = bullet.getWorldTransformMatrix().ty + bullet.height/2; // y-axis from screen of bullets plus its half height
            var outOfEdge = 0; // edge of window, where the bullets is getting removed

            if (bltY < outOfEdge) {
                bullet.destroy(); // destroy bullet from scene
                this.bullets.splice(i, 1); // remove bullet from the bullets array list
            } else {
                bullet.move(); // updating bullet and moving it
            }
        }
    }

    move() {

        this.bulletsUpdate();

        if (Game.KEYS["ArrowRight"] || Game.KEYS["KeyD"]) {
            this.moveRight(10);
        } else if (Game.KEYS["ArrowLeft"] || Game.KEYS["KeyA"]) {
            this.moveLeft(10);
        }
        if (Game.KEYS["Space"]) {
            this.fireBullet();
        }
        
    }
}