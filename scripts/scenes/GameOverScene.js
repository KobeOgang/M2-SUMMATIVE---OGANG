export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score;
        this.finalCoins = data.coins;
        this.currentLevel = data.currentLevel;
    }

    preload(){
        this.load.image('gameOver', '../assets/images/gameOver.png');
        this.load.image('reset', '../assets/images/reset.png');
        this.load.image('menu', '../assets/images/menu.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#a2d2ff');

        // Music
        this.gameOver = this.sound.add('gameOver', { volume: 1 });
        this.gameOver.play();

        // Game Over text
        const gameOverText = this.add.image(this.sys.game.config.width / 2, 130, 'gameOver');
        gameOverText.setScale(1.5); 

        // Score
        this.add.bitmapText(this.sys.game.config.width / 2, 240, 'font', 'Score: ' + this.finalScore, 25).setOrigin(0.5, 0.5);

        // Coins collected
        this.add.bitmapText(this.sys.game.config.width / 2, 270, 'font', 'Coins Collected: ' + this.finalCoins + ' / 14', 25).setOrigin(0.5, 0.5);

        // Tip
        this.add.bitmapText(this.sys.game.config.width / 2, 380, 'font', "Tip: Its not everybody's allergy, but spikes still hurt.", 20).setOrigin(0.5, 0.5);

        // Retry button
        const retryButton = this.add.image(this.sys.game.config.width / 2 + 50, this.sys.game.config.height / 2 + 140, 'reset');
        retryButton.setScale(0.5);
        retryButton.setInteractive();
        retryButton.on('pointerup', () => {  
            this.gameOver.stop();
            this.scene.start('GameBootScene', { nextLevel: this.currentLevel });
        });

        // Main Menu button
        const menuButton = this.add.image(this.sys.game.config.width / 2 - 50, this.sys.game.config.height / 2 + 140, 'menu');
        menuButton.setScale(0.5);
        menuButton.setInteractive();
        menuButton.on('pointerup', () => {
            this.gameOver.stop();
            this.scene.start('MainMenuScene');
        });
    }
}
