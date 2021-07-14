const ButtonIcon = {
    CLOSE: "close", 
    SETTINGS: "settings",
    PLAY: "play",
    PAUSE: "pause",
    OK: "ok",
    SHOP: "shop",
}

declare type ButtonIconType = "close" | "settings" | "play" | 
                                "pause" | "ok" | "shop";

export class Button extends Phaser.GameObjects.Image {
    defaultIcon: string;
    activeIcon: string;
    constructor(scene: Phaser.Scene, x: number, y: number, icon: ButtonIconType) {
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
