/// <reference path='../lib/phaser.d.ts'/>

import { Player } from "./game/player.js";

module Example{
    export class InitPhaser {

        static game: Phaser.Game;

        public static initGame() {

            let config: Phaser.Types.Core.GameConfig = {
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
            }

            this.game = new Phaser.Game(config);
        }
    }

    export class Scene extends Phaser.Scene {
        player: Player;
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
}

window.onload = () => {
    Example.InitPhaser.initGame();
};