export class GameBootScene extends Phaser.Scene {
    constructor() {
        super('GameBootScene');
    }

    init(data) {
        this.nextLevel = data.nextLevel || 'GameScene';
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

        // Running man
        const player = this.add.sprite(centerX, centerY + 100, 'player');
        player.setScale(3);
        player.anims.play('run');

        // Fun fact
        const funFactText = this.add.bitmapText(centerX, centerY + 220, 'font', 'Fun Fact: He is allergic to water...', 20).setOrigin(0.5, 0.5);

        // Next scene
        this.time.delayedCall(4000, () => {
            const mainMenuScene = this.scene.get('MainMenuScene');
            mainMenuScene.menuMusic.stop();
            this.scene.start(this.nextLevel);
        });
    }
}
