class AssetManager {

    sprites = {
        player: {
            run: []
        },
        zombie: {
            walk: []
        }
    };

    environments = {
        tile: null,
        box: null
    }

    backgroundImage;

    loadImages() {
        this.sprites.player.run = Array(9).fill(1).map((n, i) => {
            return loadImage(`assets/sprites/player-robot/Run (${i + 1}).png`);
        });

        this.sprites.zombie.walk = Array(10).fill(1).map((n, i) => {
            return loadImage(`assets/sprites/zombie/Walk${i + 1}.png`);
        })

        this.backgroundImage = loadImage(`assets/bg.png`)
        this.environments.tile = loadImage(`assets/tile.png`);
        this.environments.box = loadImage(`assets/box.png`);
    }

}