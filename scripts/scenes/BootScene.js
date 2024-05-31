export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('loading', '../assets/images/loading.png');
        this.load.spritesheet('player', '../assets/spritesheets/character.png', { frameWidth: 24, frameHeight: 24 });
        this.load.bitmapFont('font', '../assets/fonts/minogram_6x10.png', '../assets/fonts/minogram_6x10.xml');
    }

    create() {
        this.cameras.main.setBackgroundColor('#a2d2ff');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        // Loading text
        const loading = this.add.image(centerX, centerY - 50, 'loading').setOrigin(0.5);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });

        //running man
        const player = this.add.sprite(centerX, centerY + 100, 'player');
        player.setScale(3);
        player.anims.play('run');

        //Click start for bypassing audio bug
        this.time.delayedCall(3000, () => {
            const startText = this.add.bitmapText(centerX, centerY + 220, 'font', 'Click to Start', 18).setOrigin(0.5, 0.5);

            this.input.once('pointerdown', () => {
                this.scene.start('MainMenuScene');
            });
        });
    }
}