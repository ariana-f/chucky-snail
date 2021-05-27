export class LoadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('background', './images/blue_land.png');
    }

    create() {
        this.scene.start
    }
}