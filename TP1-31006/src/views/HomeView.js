export class HomeView extends Phaser.GameObjects.Container {
    #logo;
    #bkg;
    #bird;
    #button;
    #button2;

    constructor(scene) {
        super(scene);
        this.#build();
    }

    #build() {
        this.#buildBkg();
        this.#buildLogo();
        this.#buildButton();
        this.#buildBird();
    }

    #buildLogo() {
        const { width, height } = this.scene.scale;
        this.#logo = this.scene.add.image(width / 2, height / 6, "logo");
        this.#logo.displayWidth = width / 1.5;
        this.#logo.displayHeight = height / 6;
        this.add(this.#logo);
    }

    #buildBkg() {
        this.#bkg = this.scene.add.tileSprite(256, 256, 512, 512, "bkg");
        this.add(this.#bkg);
    }

    #buildBird() {
        const { width, height } = this.scene.scale;
        this.#bird = this.scene.add.image(width / 2, height / 2, "bird");
        this.add(this.#bird);
    }

    #buildButton() {
        const { width, height } = this.scene.scale;
        this.#button = this.scene.add.image(width / 2, height / 1.35, "button");
        this.#button.displayWidth = width / 4;
        this.#button.displayHeight = height / 12;
        this.#button.setInteractive();
        this.#button.on("pointerdown", this.#onButtonClick, this);
        this.add(this.#button);
    }

    #onButtonClick() {
        this.scene.scene.start("game");
    }
}
