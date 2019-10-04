class GameManager {

    constructor(assetManager) {
        this.assetManager = assetManager;
        this.isGameOver = false;
        this.initGame();
    }

    initGame() {
        this.score = 0;
        this.gameObjects = [];
        this.enemies = [];
        this.bullets = [];
        this.player = new Player(
            createVector(100, height - 152),
            createVector(120, 120),
            this.assetManager.sprites.player
        );
    }

    render() {
        if (!this.isGameOver) {
            this.renderScore();
            this.renderTiles();
            this.renderBullets();
            this.generateEnemies();
            this.generateBoxes();
            this.renderBoxes();
            this.renderEnemy();
            this.renderPlayer();
        } else {
            this.renderGameOver();
        }
    }

    renderGameOver() {
        textSize(42);
        fill(color(255, 255, 255));
        text(`Game Over Final Score: ${this.score}`, (width / 2) - 250, height - 100);
    }

    renderScore() {
        this.score += +(frameCount % 20 === 0);
        textSize(32);
        fill(color(255, 255, 255));
        text(`Score: ${this.score}`, (width / 2) - 60, 50);
    }

    renderEnemy() {
        this.enemies = this.enemies.map((enemy) => {
            enemy.update();
            enemy.render();
            let hasCollided = false;
            this.bullets.forEach(bullet => {
                if (bullet.hasCollided(enemy)) {
                    hasCollided = true;
                    bullet.isCollided = true;
                }
            });
            enemy.life -= (hasCollided) ? 20 : 0;
            return enemy;
        }).filter(enemy => !enemy.isDead());
    }

    renderPlayer() {
        this.player.applyGravity();
        this.player.update();
        this.player.render();
        this.gameObjects.forEach(box => {
            if (this.player.hasCollided(box)) {
                this.isGameOver = true;
            }
        });
        this.enemies.forEach(enemy => {
            if (this.player.hasCollided(enemy)) {
                this.isGameOver = true;
            }
        })
        if (keyIsPressed && keyCode === 32) {
            this.player.jump();
        }
        if (mouseIsPressed) {
            const bullet = this.player.fire();
            if (bullet) {
                this.bullets.push(bullet);
            }
        }
    }

    renderBullets() {
        this.bullets = this.bullets.map((bullet) => {
            bullet.update();
            bullet.render();
            return bullet;
        }).filter(bullet => !bullet.isCollided);
    }

    renderTiles() {
        Array(10).fill(1).map((n, i) => {
            push();
            translate((i * 100) + 50, height - 50);
            imageMode(CENTER);
            image(this.assetManager.environments.tile, 0, 0, 100, 100);
            pop();
        })
    }

    renderBoxes() {
        this.gameObjects = this.gameObjects.map((box) => {
            box.update();
            box.render();
            return box;
        });
    }

    generateBoxes() {
        if (frameCount % 200 === 0 && random() > 0.50) {
            const size = random(30, 50);
            const box = new GameObject(
                createVector(random(1200, 1400), height - 100 - (size / 2)),
                createVector(-5.3, 0),
                createVector(size, size),
                this.assetManager.environments.box
            );
            this.gameObjects.push(box);
        }
    }


    generateEnemies() {
        if (frameCount % 240 === 0 && random() > 0.35) {
            const enemy = new Enemy(
                createVector(random(1200, 1400), height - 150),
                createVector(-1.7, 0),
                createVector(100, 100),
                60,
                this.assetManager.sprites.zombie
            );
            this.enemies.push(enemy);
        }
    }

}