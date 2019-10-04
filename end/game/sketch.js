p5.disableFriendlyErrors = true;
let canvas;
let gameManager;
let assetManager = new AssetManager();

function preload() {
    assetManager.loadImages();
}


function setup() {
    canvas = createCanvas(1000, 500);
    gameManager = new GameManager(assetManager);
}

function draw() {
    background(assetManager.backgroundImage);
    gameManager.render();
}