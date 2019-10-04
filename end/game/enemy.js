class Enemy {

    constructor(pos, vel, size, life, sprites) {
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.life = life;
        this.sprites = sprites;
        this.currentFrame = 0;
    }

    update() {
        this.pos.add(this.vel);
        if (frameCount % 3 === 0) {
            this.currentFrame = (this.currentFrame < this.sprites.walk.length - 1) ? this.currentFrame + 1 : 0;
        }
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        image(this.sprites.walk[this.currentFrame], 0, 0, this.size.x, this.size.y);
        pop();
    }

    hasCollided(target) {
        return this.pos.x < target.pos.x + target.size.x &&
            this.pos.x + this.size.x > target.pos.x &&
            this.pos.y < target.pos.y + target.size.y &&
            this.pos.y + this.size.y > target.pos.y
    }

    isDead() {
        return this.life <= 0;
    }
}