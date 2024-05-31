export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        this.load.image('background', '../assets/images/background.png');
        this.load.image('allergies', '../assets/images/allergies.png');
        this.load.image('title', '../assets/images/title.png');
        this.load.image('play', '../assets/images/play.png');
        this.load.image('exit', '../assets/images/exit.png');
        this.load.image('reset', '../assets/images/reset.png');
        this.load.image('menu', '../assets/images/menu.png');
        this.load.image('next', '../assets/images/next.png');
        this.load.image('level1', '../assets/images/level1.png');
        this.load.image('level2', '../assets/images/level2.png');
        this.load.image('level3', '../assets/images/level3.png');
        this.load.image('gameOver', '../assets/images/gameOver.png');
        this.load.spritesheet('player',
            '../assets/spritesheets/character.png',
            { frameWidth: 24, frameHeight: 24 }
        );
        this.load.spritesheet('coin',
            '../assets/tiles/tiles.png',
            { frameWidth: 18, frameHeight: 18 }
        );
        this.load.bitmapFont('font', '../assets/fonts/minogram_6x10.png', '../assets/fonts/minogram_6x10.xml');
        this.load.audio('menuMusic', '../assets/audio/BGM/menuMusic.ogg');
        this.load.audio('gameMusic', '../assets/audio/BGM/gameMusic.mp3');
        this.load.audio('gameMusic2', '../assets/audio/BGM/gameMusic2.mp3');
        this.load.audio('gameMusic3', '../assets/audio/BGM/gameMusic3.wav');
        this.load.audio('coin1', '../assets/audio/SFX/coin1.wav');
        this.load.audio('coin2', '../assets/audio/SFX/coin2.wav');
        this.load.audio('coin3', '../assets/audio/SFX/coin3.wav');
        this.load.audio('coin4', '../assets/audio/SFX/coin4.wav');
        this.load.audio('death', '../assets/audio/SFX/death.ogg');
        this.load.audio('gameOver', '../assets/audio/SFX/gameOver.mp3');
        this.load.audio('winMusic', '../assets/audio/BGM/winMusic.mp3');
    }

    create() {

        //Music
        this.menuMusic = this.sound.add('menuMusic', { volume: 0.6, loop: true });
        this.menuMusic.play();
        
        this.cameras.main.setZoom(1);

        // Background
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        //Scaling
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        //Center
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        // Title
        const title = this.add.image(centerX, 50, 'title').setOrigin(0.5, 0);
        const text = this.add.image(centerX, 450, 'allergies').setOrigin(0.5, 0);

        // Play button
        const playButton = this.add.image(1000, 450, 'play');
        playButton.setOrigin(0.5);
        playButton.setScale(0.2);
        playButton.setInteractive();
        playButton.on('pointerup', () => {
            this.scene.start('GameBootScene', { nextLevel: 'GameScene' });
        });

        // Quit button
        const quitButton = this.add.image(1150, 450, 'exit');
        quitButton.setOrigin(0.5);
        quitButton.setScale(0.2);
        quitButton.setInteractive();
        quitButton.on('pointerup', () => {
            this.quitGame();
        });
    }

    quitGame() {
        alert('You exited the game.');
    }

    update() {
    }
}
