export class LoadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('background', './images/blue_land.png');
        this.load.spritesheet('player', './images/player.png', {
            frameWidth: 128,
            frameHeight: 144
        })

    }

    create() {
        this.createAnimations();

        this.scene.start('Level001');
    }

    createAnimations() {
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNames('player', {
                frame: [9, 10]
            }),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key:'climbing',
            frames: this.anims.generateFrameNames('player',{
                frames:[0, 1]
            }),
            frameRate: 4,
            yoyo: true,
            repeat: -1

        });
    }
}