const ButtonIcon = {
    CLOSE: "close",
    SETTINGS: "settings",
    PLAY: "play",
    PAUSE: "pause",
    OK: "ok",
    SHOP: "shop",
};
export class Button extends Phaser.GameObjects.Image {
    constructor(scene, x, y, icon) {
        super(scene, x, y, icon);
        this.defaultIcon = icon;
        this.activeIcon = icon + "Active";
        this.setInteractive();
        this.on("pointermove", () => {
            this.setTexture(this.activeIcon);
        });
        this.on("pointerout", () => {
            this.setTexture(this.defaultIcon);
        });
    }
}
