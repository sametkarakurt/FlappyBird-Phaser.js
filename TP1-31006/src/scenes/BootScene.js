import { Scenes } from "../constants";
import { HomeView } from "../views/HomeView";
export class BootScene extends Phaser.Scene {
    #homeView;
    create() {
        this.#buildHomeView();
    }

    update() {
        this.#homeView.update();
    }

    #buildHomeView() {
        this.#homeView = new HomeView(this);
        this.add.existing(this.#homeView);
    }
}
