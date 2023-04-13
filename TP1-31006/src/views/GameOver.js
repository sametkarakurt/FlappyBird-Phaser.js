export class GameOver {
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        const { width, height } = this.relatedScene.scale;
        this.gameOver = this.relatedScene.add.image(width / 2, height / 4, "gameOver");

        this.gameOver.visible = false;

        this.gameOver.setDepth(4);
    }

    changeVisibility() {
        this.gameOver.visible = true;
    }
}
