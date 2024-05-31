var config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 890,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player, cursors, textScore, gameOverText, spikes, score = 0;
var maxApples = 3;
var apples;

var colors = ['0xff0000', '0xffa500', '0xffff00', '0x00ff00', '0x0000ff', '0x4b0082', '0xee82ee'];
var colorIndex = 0;
var applesCollected = 0;
const applesTilSizeIncrease = 5;

function preload() {
    this.load.image('ground', '../assets/images/platform.png');
    this.load.image('sky', '../assets/images/background.jpg');
    this.load.image('apple', '../assets/images/apple.png');
    this.load.image('spike', '../assets/images/spike.png');
    this.load.spritesheet('dude',
        '../assets/images/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    //Background
    var sky = this.add.image(0, 0, 'sky');
    sky.setOrigin(0, 0);
    sky.setScale(config.width / sky.width, config.height / sky.height);

    //platforms
    var platforms = this.physics.add.staticGroup();
    platforms.create(200, 850, 'ground');
    platforms.create(590, 850, 'ground');
    platforms.create(980, 850, 'ground');
    platforms.create(1370, 850, 'ground');
    platforms.create(1760, 850, 'ground');

    platforms.create(500, 720, 'ground');
    platforms.create(1000, 600, 'ground');
    platforms.create(60, 400, 'ground');
    platforms.create(1900, 300, 'ground');
    platforms.create(860, 200, 'ground');

    platforms.create(1400, 500, 'ground').setScale(.5).refreshBody();
    platforms.create(1600, 400, 'ground').setScale(.5).refreshBody();
    platforms.create(560, 470, 'ground').setScale(.5).refreshBody();
    platforms.create(500, 270, 'ground').setScale(.3).refreshBody();

    //Player
    this.player = this.physics.add.sprite(100, 700, 'dude');
    this.player.setBounce(0.15);
    this.player.setCollideWorldBounds(true);

    //anims
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, platforms);

    //apples
    apples = this.physics.add.group({
        key: 'apple',
        repeat: maxApples - 1, 
        setXY: { x: 50, y: 40, stepX: Phaser.Math.Between(400, 700) } 
    });

    apples.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
    });

    this.physics.add.collider(apples, platforms);

    //Spikes
    spikes = this.physics.add.staticGroup();
    spikes.create(200, 800, 'spike');
    spikes.create(800, 800, 'spike');
    spikes.create(1100, 800, 'spike');
    spikes.create(1600, 800, 'spike');
    spikes.create(600, 670, 'spike');
    spikes.create(1000, 550, 'spike');
    spikes.create(970, 550, 'spike');
    spikes.create(940, 550, 'spike');
    spikes.create(540, 435, 'spike');

    // Text 
    textScore = this.add.text(1600, 16, 'Apples Collected: 0', { fontSize: '32px', fill: '#fff',
     fontFamily: 'Arial, sans-serif', fontWeight: 'bold'});

    gameOverText = this.add.text(config.width / 2, config.height / 2, 'Game Over', { fontSize: '64px', fill: '#f22734',
    fontFamily: 'Arial, sans-serif', fontWeight: 'bold'});
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);

    //Controls
    cursors = this.input.keyboard.createCursorKeys();

    //player.setTint(parseInt(colors[colorIndex], 16));
}

function update() {
    //Movement
    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-500);
    }

    //Size increase
    if (applesCollected >= applesTilSizeIncrease) {
        increasePlayerSize();
        applesCollected = 0;
    }

    //Events
    this.physics.add.overlap(this.player, apples, collectApple);
    this.physics.add.overlap(this.player, spikes, gameOver);
}

//functions
function collectApple(player, apple) {
    score++;
    textScore.setText('Apples Collected: ' + score);
    apple.disableBody(true, true);
    var x = Phaser.Math.Between(40, 1800);
    var y = Phaser.Math.Between(40, 50);
    var newApple = apples.create(x, y, 'apple');
    newApple.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
    applesCollected++;
    changePlayerColor();
}

function gameOver(){
    gameOverText.setVisible(true);
    this.player.disableBody(true, true);
}

function increasePlayerSize() {
    this.player.setScale(this.player.scaleX * 1.1, this.player.scaleY * 1.1);
}

function changePlayerColor() {
    this.player.setTint(parseInt(colors[colorIndex], 16));
    colorIndex = (colorIndex + 1) % colors.length;
}