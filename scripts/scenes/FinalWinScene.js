export class FinalWinScene extends Phaser.Scene {
    constructor() {
        super('FinalWinScene');
    }

    init(data) {
        this.finalScore = data.score;
        this.finalCoins = data.coins;
        this.nextLevel = data.nextLevel; 
        this.currentLevel = data.currentLevel;
    }

    preload(){
        this.load.image('win', '../assets/images/win.png');
        this.load.image('reset', '../assets/images/reset.png');
        this.load.image('menu', '../assets/images/menu.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#a2d2ff');

        // Music
        this.winMusic = this.sound.add('winMusic', { volume: 0.7, loop: true });
        this.winMusic.play();

        // Win text
        const winText = this.add.image(this.sys.game.config.width / 2, 130, 'win'); 

        // Score
        this.add.bitmapText(this.sys.game.config.width / 2, 240, 'font', 'Score: ' + this.finalScore, 25).setOrigin(0.5, 0.5);

        // Coins collected
        this.add.bitmapText(this.sys.game.config.width / 2, 270, 'font', 'Coins Collected: ' + this.finalCoins 
        + ' / 14', 25).setOrigin(0.5, 0.5);

        // Yessir
        this.add.bitmapText(this.sys.game.config.width / 2, 380, 'font', '"Not today water! Not today."', 20).setOrigin(0.5, 0.5);

        // Retry button
        const retryButton = this.add.image(this.sys.game.config.width / 2 + 50, this.sys.game.config.height / 2 + 140, 'reset');
        retryButton.setScale(0.5);
        retryButton.setInteractive();
        retryButton.on('pointerup', () => {
            this.winMusic.stop();
            this.scene.start('GameBootScene', { nextLevel: this.currentLevel });
        });

        // Main Menu button
        const menuButton = this.add.image(this.sys.game.config.width / 2 - 50, this.sys.game.config.height / 2 + 140, 'menu');
        menuButton.setScale(0.5);
        menuButton.setInteractive();
        menuButton.on('pointerup', () => {
            this.winMusic.stop();
            this.scene.start('MainMenuScene');
        });
    }
}
