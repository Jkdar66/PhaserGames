/// <reference path='../lib/phaser.d.ts'/>
import { Player } from "./game/game.js";
var Example;
(function (Example) {
    class InitPhaser {
        static initGame() {
            let config = {
                type: Phaser.AUTO,
                width: innerWidth,
                height: innerHeight,
                physics: {
                    default: "arcade",
                    arcade: {
                        gravity: { y: 5 },
                        debug: false
                    }
                },
                scene: new Scene(),
                banner: true,
                title: ''
            };
            this.game = new Phaser.Game(config);
        }
    }
    Example.InitPhaser = InitPhaser;
    class Scene extends Phaser.Scene {
        constructor() {
            super({});
        }
        preload() {
        }
        create() {
            this.player = new Player(this);
            this.add.existing(this.player);
        }
        update() {
            if (!this.player.isKilled) {
                this.player.update();
            }
            else if (this.player.isKilled) {
                this.player.delete();
            }
        }
    }
    Example.Scene = Scene;
})(Example || (Example = {}));
window.onload = () => {
    Example.InitPhaser.initGame();
};
