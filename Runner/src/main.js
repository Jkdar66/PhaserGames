/// <reference path='../lib/phaser.d.ts'/>
import { Player } from "./game/player.js";
var Example;
(function (Example) {
    class InitPhaser {
        static initGame() {
            let config = {
                type: Phaser.AUTO,
                width: 500,
                height: 800,
                physics: {
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
            this.player = new Player(this, 250, 500, 100, 100);
            this.add.existing(this.player);
            this.player.fillColor = 0xff00ff;
        }
        update() {
            this.player.update();
        }
    }
    Example.Scene = Scene;
})(Example || (Example = {}));
window.onload = () => {
    Example.InitPhaser.initGame();
};
