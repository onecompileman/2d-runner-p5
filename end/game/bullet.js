class Bullet {
    constructor(pos, vel, size) {
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.isCollided = false;
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        ellipseMode(CENTER);
        noStroke();
        fill(255);
        ellipse(0, 0, this.size.x, this.size.y);
        pop();
    }

    update() {
        this.pos.add(this.vel);
    }

    hasCollided(target) {
        return this.pos.x < target.pos.x + target.size.x &&
            this.pos.x + this.size.x > target.pos.x &&
            this.pos.y < target.pos.y + target.size.y &&
            this.pos.y + this.size.y > target.pos.y;
    }

    outOfBounds() {
        return this.pos.x - this.size.x < 0;
    }

}