import {MainMenuScene} from './scenes/MainMenuScene.js';
import {GameScene} from './scenes/GameScene.js';
import {GameOverScene} from './scenes/GameOverScene.js';
import { BootScene } from './scenes/BootScene.js';
import { GameBootScene } from './scenes/GameBootScene.js';
import { WinScene } from './scenes/WinScene.js';
import { GameScene2 } from './scenes/GameScene2.js';
import { GameScene3 } from './scenes/GameScene3.js';
import { FinalWinScene } from './scenes/FinalWinScene.js'; 

var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    pixelArt: true,
    scene: [BootScene, MainMenuScene,GameBootScene, GameScene, GameScene2,GameScene3, GameOverScene, WinScene, FinalWinScene]
};

var game = new Phaser.Game(config);

game.scene.start('BootScene');