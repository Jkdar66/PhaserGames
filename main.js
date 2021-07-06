/// <reference path='./phaser.d.ts'/>
var Example;
(function (Example) {
    class InitPhaser {
        static initGame() {
            let config = {
                type: Phaser.AUTO,
                width: 480,
                height: 320,
                scene: [],
                banner: true,
                title: 'Example',
                url: 'https://updatestage.littlegames.app',
                version: '1.0.0'
            };
            this.gameRef = new Phaser.Game(config);
        }
    }
    Example.InitPhaser = InitPhaser;
})(Example || (Example = {}));
window.onload = () => {
    Example.InitPhaser.initGame();
};
//# sourceMappingURL=main.js.map