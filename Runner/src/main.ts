/// <reference path='../lib/phaser.d.ts'/>

import { Player } from "./game/game.js";

module Example{
    export class InitPhaser {

        static game: Phaser.Game;

        public static initGame() {

            let config: Phaser.Types.Core.GameConfig = {
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
            this.player = new Player(this);
            this.add.existing(this.player);
        }

        update() {
            if(!this.player.isKilled) {
                this.player.update();
            } else if (this.player.isKilled) {
                this.player.delete();
            }
        }
    }
}

window.onload = () => {
    Example.InitPhaser.initGame();
};