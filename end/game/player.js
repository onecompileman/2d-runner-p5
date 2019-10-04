class Player {

    constructor(pos, size, sprites) {
        this.pos = pos;
        this.size = size;
        this.sprites = sprites;
        this.fireCooldown = 25;
        this.fireCooldownStatus = 0;
        this.vel = createVector(0, 0);
        this.force = createVector(0, 0)
        this.gravityForce = createVector(0, 0.4);
        this.frame = 0;
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        image(this.sprites.run[this.frame], 0, 0, this.size.x, this.size.y);
        if (frameCount % 4 === 0) {
            this.frame = this.frame < this.sprites.run.length - 1 ? this.frame + 1 : 0;
        }
        pop();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.force);
        this.force.mult(0);
        if (this.pos.y > height - 152) {
            this.vel.y = 0;
            this.pos.y = height - 152;
        }
        this.fireCooldownStatus--;
    }

    applyGravity() {
        this.force.x = this.gravityForce.x;
        this.force.y = this.gravityForce.y;
    }

    jump() {
        if (this.pos.y === (height - 152)) {
            this.vel.y = -10;
        }
    }

    fire() {
        if (this.fireCooldownStatus <= 0) {
            this.fireCooldownStatus = this.fireCooldown;
            return new Bullet(
                createVector(this.pos.x + 50, this.pos.y + 10),
                createVector(8, 0),
                createVector(20, 20)
            );
        }
        return null;
    }

    hasCollided(target) {
        return this.pos.x < (target.pos.x - 20) + target.size.x / 2 &&
            this.pos.x + this.size.x / 2 > target.pos.x &&
            this.pos.y < target.pos.y + target.size.y / 2 &&
            this.pos.y + this.size.y / 2 > target.pos.y
    }

}