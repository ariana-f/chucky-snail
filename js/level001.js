import { Player } from "./player.js";
import { Bug } from "./bug.js";

let levelData = [
    {
        x: 1024 - 128,
        y: 2048 - 192,
        repeat: 1,
        key: 'ground',
        frame: 0,
        width: 128,
        height: 128
    },
    {
        x: 1024,
        y: 2048 - 192,
        repeat: 3,
        key: 'ground',
        frame: 1,
        width: 128,
        height: 128
    },
    {
        x: 1024 + 384,
        y: 2048 - 192,
        repeat: 1,
        key: 'ground',
        frame: 2,
        width: 128,
        height: 128
    }
]

let ladybugsData = [
    {
        x: 1664,
        y:1728,
        key: 'ladybug',
        frame: 0,
        animation: 'ladybug-flying',
        min: {
            x: 736,
            y:1728
        },
        max: {
            x: 1664,
            y: 1728
        },
        velocity: 160
    },
]

export class Level001 extends Phaser.Scene {
    constructor() {
        super('Level001');
    }

    init() {
        this.controls = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', (pointer) => {
            console.log(`${pointer.x}, ${pointer.y}`);
        })
    }

    create() {
        this.platforms = this.physics.add.staticGroup({
            allowGravity: false,
            immovable: true
        });
        
        this.add.image(0, 0, 'background').setOrigin(0).setScale(2);

        this.ladder = this.physics.add.staticGroup({
            allowGravity: false,
            immovable: true,
        });

        this.snails = this.physics.add.staticGroup({
            
        });
        
        this.createPlatforms();
        this.createLadder();

        this.snail = this.add.sprite(192, 1568, 'snail', 0).setOrigin(0);
        this.snail.anims.play('snail-walking');
        
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player', 6
        );

        

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.snails, this.platforms);
        this.physics.add.overlap(this.player, this.ladders, this.onLadder, null, this);
    }

    createPlatforms() {
        levelData.forEach(
            data => {
                let newPlatform = undefined;
                if(data.repeat == 1) {
                    newPlatform = this.add.sprite(data.x, data.y, data.key, data.frame);
                } else {
                    newPlatform = this.add.tileSprite(data.x, data.y,
                        data.repeat * data.width, data.height, data.key, data.frame);
                }
                newPlatform.setOrigin(0);
                if(data.physics)
                {
                    this.platforms.add(newPlatform)
                }
            }
        );
    }

    createLadder() {
        let ladder = this.add.tileSprite(
            1024 + 256, 2048 - 768, 128, 5 * 128, 'objects', 3
        ).setOrigin(0);
        let ladderTop = this.add.sprite(
            1024 + 256, 2048 - 896, 'objects', 4
        ).setOrigin(0);

        this.ladders.add(ladder);
        this.ladders.add(ladderTop);
    }

    createSnails() {
        snailData.forEach(snail => {
            let newSnail = new Bug(this, snail);
            this.snails.add(newSnail);
        });
    }

    createLadybugs() {
        ladybugData.forEach(ladybug => {
            let newLadybug = new Bug(this, ladybug);
            this.ladybugs.add(newLadybug);
        });
    }

    onLadder(player, ladder) {
        this.player.setOnLadder(true);
    }

    onSnail(player, snail)
    {
        snail.destroy();
    }

    update(time) {
        this.player.update(time);
        this.snails.getChildren().forEach( snail => snail.update(time));

        this.player.setOnLadder(false);
    }
}