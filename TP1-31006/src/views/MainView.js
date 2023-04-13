import { ScoreBoard } from "./ScoreBoard";
import { GAME_CONFIGS } from "../constants";
import { PipeContainer } from "./PipeContainer";
import { GameOver } from "./GameOver";
import { RestartButton } from "./RestartButton";

export class MainView extends Phaser.GameObjects.Container {
    #bkg;
    #bird;
    #pipes;
    #overlap;
    #isLost;
    #scoreLabel;
    #pointSound;
    #wingSound;
    #dieSound;
    #button;
    #gameOver;

    constructor(scene) {
        super(scene);
        this.#build();
        this.#addPipe();
        this.#addPipe();
        this.#addPipe();
        this.#addOverlap();
    }

    update() {
        this.#addOverlap();

        const { height } = this.scene.scale;

        if (this.#isLost) return;

        if (this.#bird && this.#bird.y > height - this.#bird.height / 2) {
            this.#dieSound.play();
            this.#button.visible = true;
            this.#gameOver.changeVisibility();
            this.#button.changeVisibility();
            this.scene.physics.world.disable(this.#bird);
            this.#disableActions();
        }

        this.#pipes.forEach((p, i) => {
            p.x -= GAME_CONFIGS.speed / 2;
            console.log(this.#bird.x - p.x);
            if (parseInt(this.#bird.x - p.x) == 5) {
                this.#scoreLabel.incrementPoints(1);
                this.#pointSound.play();
            }
            if (p.x <= -26) {
                p.destroy();
                this.#pipes.splice(i, 1);
                this.#addPipe();
            }
        });

        this.#bkg.tilePositionX += GAME_CONFIGS.speed;
    }

    #build() {
        this.#isLost = false;
        this.#pipes = [];
        this.#buildBkg();
        this.#buildButton();
        this.#buildSounds();
        this.#buildScore();
        this.#buildBird();
        this.#buildGameOver();
    }

    #buildScore() {
        this.#scoreLabel = new ScoreBoard(this.scene);
        this.#scoreLabel.create();
    }

    #buildSounds() {
        this.#wingSound = this.scene.sound.add("wing");
        this.#pointSound = this.scene.sound.add("point");

        this.#dieSound = this.scene.sound.add("die");
    }

    #addPipe() {
        const pipeX = this.#pipes.length ? this.#pipes[this.#pipes.length - 1].x + 200 : 300;
        const pipe = new PipeContainer(this.scene);
        pipe.x = pipeX;
        this.add(pipe);
        this.#pipes.push(pipe);
    }

    #addOverlap() {
        const allPipes = this.#pipes.map((p) => p.getPipes()).flat();
        this.#overlap?.destroy();
        this.#overlap = this.scene.physics.add.overlap(this.#bird, allPipes, () => {
            this.#dieSound.play();
            this.#button.visible = true;
            this.#gameOver.changeVisibility();
            this.#button.changeVisibility();
            this.#bkg.disableInteractive();
            this.#isLost = true;
        });
    }

    #disableActions() {
        this.#bkg.disableInteractive();
        this.#isLost = true;
    }

    #buildBkg() {
        this.#bkg = this.scene.add.tileSprite(256, 256, 512, 512, "bkg");
        this.#bkg.setInteractive();
        this.#bkg.on("pointerdown", this.#onBkgClick, this);
        this.add(this.#bkg);
    }

    #buildBird() {
        const { width, height } = this.scene.scale;
        this.#bird = this.scene.add.image(width * 0.2, height / 2, "bird");
        this.scene.physics.add.existing(this.#bird);
        this.add(this.#bird);
    }

    #onBkgClick() {
        this.#bird.body.velocity.y = GAME_CONFIGS.birdVelocity;
        this.#wingSound.play();
    }

    #buildButton() {
        this.#button = new RestartButton(this.scene);
        this.#button.create();
    }

    #buildGameOver() {
        this.#gameOver = new GameOver(this.scene);
        this.#gameOver.create();
    }
}
