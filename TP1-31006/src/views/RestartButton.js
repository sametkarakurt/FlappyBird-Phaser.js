export class RestartButton {
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        const { width, height } = this.relatedScene.scale;
        this.button = this.relatedScene.add.image(width / 2, height / 2, "button");
        this.button.displayWidth = width / 4;
        this.button.displayHeight = height / 12;
        this.button.setInteractive();
        this.button.on("pointerdown", this.onButtonClick, this);
        this.button.visible = false;

        this.button.setDepth(4);
    }

    changeVisibility() {
        this.button.visible = true;
    }

    onButtonClick() {
        this.relatedScene.scene.start("game");
    }
}
