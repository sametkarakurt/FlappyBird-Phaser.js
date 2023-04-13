import { Scenes } from "../constants";

export class PreloadScene extends Phaser.Scene {
    preload() {
        //
    }

    create() {
        this.load.image("logo", "src/assets/logo.png");
        this.load.image("bkg", "src/assets/background-day.png");
        this.load.image("bird", "src/assets/bluebird-downflap.png");
        this.load.image("pipe", "src/assets/pipe-green.png");
        this.load.image("button", "src/assets/button.png");
        this.load.image("gameOver", "src/assets/gameover.png");
        this.load.audio("wing", "src/assets/wing.wav");
        this.load.audio("point", "src/assets/point.wav");
        this.load.audio("die", "src/assets/die.wav");
        this.load.audio("hit", "src/assets/hit.wav");
        this.load.on("progress", this.#onFileLoadComplete, this);
        this.load.on("complete", this.#onLoadComplete, this);
        this.load.start();
    }

    #onFileLoadComplete(progress) {
        console.log("LOAD_PROGRESS", progress);
    }

    #onLoadComplete() {
        this.game.scene.stop(Scenes.Preload);
        this.game.scene.start(Scenes.Boot);
    }
}
