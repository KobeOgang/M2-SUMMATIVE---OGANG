export class GameScene2 extends Phaser.Scene {
    constructor() {
        super('GameScene2');
    }

    preload() {
        this.load.image('tiles', '../assets/tiles/tiles.png');
        this.load.image('tiles2', '../assets/tiles/tiles2.png');
        this.load.tilemapTiledJSON('map2', '../assets/maps/map2.json');
    }

    create() {
        // Background color
        this.cameras.main.setBackgroundColor('#ccd5ae');

        //Music
        this.gameMusic = this.sound.add('gameMusic2', { volume: 1.3, loop: true });
        this.gameMusic.play();

        //SFX
        this.coinSounds = [
            this.sound.add('coin1', { volume: 1 }),
            this.sound.add('coin2', { volume: 1 }),
            this.sound.add('coin3', { volume: 1 }),
            this.sound.add('coin4', { volume: 1 })
        ];
        this.death = this.sound.add('death', { volume: 1 });

        //Map
        const map = this.make.tilemap({ key: 'map2', tileWidth: 18, tileHeight: 18, margin: 1, spacing: 1 });
        const tileset = map.addTilesetImage('tiles1', 'tiles');
        const tileset2 = map.addTilesetImage('tiles2', 'tiles2');
        const background = map.createLayer('background', tileset2, 0, 0);
        const foreground = map.createLayer('foreground', tileset2, 0, 0);
        const objects = map.createLayer('objects', tileset2, 0, 0);
        this.water = map.createLayer('water', tileset2, 0, 0);
        this.spikes = map.createLayer('spikes', tileset, 0, 0);
        const end = map.createLayer('end', tileset2, 0, 0);

        // Collisions
        foreground.setCollisionByExclusion([-1]);
        this.water.setCollisionByExclusion([-1]);
        this.spikes.setCollisionByExclusion([-1]);
        end.setCollisionByExclusion([-1]);

        // Player
        this.player = this.physics.add.sprite(40, 250, 'player');
        this.player.body.setSize(this.player.width, this.player.height - 1).setOffset(0, 1);

        //Coin
        this.createCoin(187, 230);
        this.createCoin(10, 60);
        this.createCoin(300, 40);
        this.createCoin(375, 180);
        this.createCoin(640, 230);
        this.createCoin(710, 230);
        this.createCoin(890, 240);
        this.createCoin(1100, 170);
        this.createCoin(1250, 40);
        this.createCoin(1503, 40);
        this.createCoin(2185, 40);
        this.createCoin(2375, 150);
        this.createCoin(2495, 220);
        this.createCoin(2620, 170);

        //anims
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });

        //Lives text
        this.lives = 3;
        this.livesText = this.add.bitmapText(980, 155, 'font', 'Lives: 3', 15).setScrollFactor(0).setOrigin(0, 0);

        //Score text
        this.score = 0;
        this.scoreText = this.add.bitmapText(360, 155, 'font', 'Score: 0', 15).setScrollFactor(0).setOrigin(0, 0);

        //COins text
        this.coins = 0;
        this.coinsText = this.add.bitmapText(360, 170, 'font', 'Coins Collected: 0', 15).setScrollFactor(0).setOrigin(0, 0);

        //level name text
        this.displayLevelName('level2');

        //Colliders
        this.physics.add.collider(this.player, foreground);
        this.colliderWater = this.physics.add.collider(this.player, this.water, this.playerDie, null, this);
        this.colliderSpikes = this.physics.add.collider(this.player, this.spikes, this.playerDie, null, this);
        this.physics.add.collider(this.player, end, this.playerWin, null, this);

        //World bounds
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);

        //Camera adjustments
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);
        this.cameras.main.roundPixels = true;
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        //Movement flag
        this.allowMovement = true;
    }

    update() {
        if (this.allowMovement) {
            // Movement
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);
                this.player.setFlipX(false);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('left', true);
                this.player.setFlipX(true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.stop();
                this.player.setFrame(0);
            }

            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(-355);
            }
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
    }

    playerDie(player, tile) {
        this.lives--;
        this.livesText.setText('Lives: ' + this.lives);

        if (this.lives <= 0) {
            this.gameMusic.stop();
            this.scene.start('GameOverScene', { score: this.score, coins: this.coins, currentLevel: 'GameScene2' });
        } else {
            this.death.play();
            //Disable collision n movement
            this.allowMovement = false;
            this.physics.world.removeCollider(this.colliderWater);
            this.physics.world.removeCollider(this.colliderSpikes);

            this.tweens.add({
                targets: this.player,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    this.player.setPosition(40, 250);
                    this.tweens.add({
                        targets: this.player,
                        alpha: 1,
                        duration: 500,
                        onComplete: () => {
                            //Enable collision n movement
                            this.time.delayedCall(500, () => {
                                this.allowMovement = true;
                                this.colliderWater = this.physics.add.collider(this.player, this.water, this.playerDie, null, this);
                                this.colliderSpikes = this.physics.add.collider(this.player, this.spikes, this.playerDie, null, this);
                            });
                        }
                    });
                }
            });
        }
    }

    playerWin(player, tile) {
        this.gameMusic.stop();
        this.scene.start('WinScene', { score: this.score, coins: this.coins, nextLevel: 'GameScene3', currentLevel: 'GameScene2' });
    }

    createCoin(x, y) {
        const coin = this.physics.add.staticSprite(x, y, 'coin');

        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 151, end: 152 }),
            frameRate: 8,
            repeat: -1
        });

        coin.anims.play('spin');

        //event
        this.physics.add.overlap(this.player, coin, this.collectCoin, null, this);
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        var randomCoinSound = Phaser.Math.RND.pick(this.coinSounds);
        randomCoinSound.play();
        //Scoring
        this.score += 12;
        this.scoreText.setText('Score: ' + this.score);
        this.coins += 1;
        this.coinsText.setText('Coins Collected: ' + this.coins);
    }

    displayLevelName(imageId) {
        const levelText = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, imageId).setOrigin(0.5);
        levelText.setScale(0.6);
        levelText.setScrollFactor(0);
        levelText.alpha = 0;

        levelText.setTexture(imageId);

        this.tweens.add({
            targets: levelText,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: levelText,
                        alpha: 0,
                        duration: 1000,
                        ease: 'Linear',
                        onComplete: () => {
                            levelText.destroy();
                        }
                    });
                });
            }
        });
    }
}
