export class PipeContainer extends Phaser.GameObjects.Container {
    #pipeTop;
    #pipeBottom;
    constructor(scene) {
        super(scene);
        this.#init();
    }

    #init() {
        const pipeBottomY = Math.random() * 50 + 400;
        this.#pipeBottom = this.scene.physics.add.sprite(0, pipeBottomY, "pipe");
        this.#pipeBottom.body.allowGravity = false;

        const pipeTopY = Math.random() * 50 - 50;
        this.#pipeTop = this.scene.physics.add.sprite(0, pipeTopY, "pipe");
        this.#pipeTop.body.allowGravity = false;
        this.#pipeTop.scaleY *= -1;
        this.add(this.#pipeTop);
        this.add(this.#pipeBottom);
    }

    getPipes() {
        return [this.#pipeTop, this.#pipeBottom];
    }
}
