export class ScoreBoard {
    constructor(scene) {
        this.relatedScene = scene;
        this.score = 0;
    }

    create() {
        const { width, height } = this.relatedScene.scale;
        const size = height / 10;
        this.scoreText = this.relatedScene.add.text(width / 2, 0, "0", {
            fontSize: size + "px",
            fill: "#fff",
            fontFamily: "verdana, arial, sans-serif",
        });
        this.scoreText.setDepth(4);
    }

    incrementPoints(points) {
        this.score += points;
        this.scoreText.setText("" + this.score);
    }
}
