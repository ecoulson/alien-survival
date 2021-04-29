import { Runner } from "../enemies/runner";
import { GameObject } from "../game-objects/game-object";
import { Line } from "../math/line";
import { Scene } from "../scenes/scene";
import { EmptySprite } from "../sprites/empty-sprite";

export class WaveManger extends GameObject {
    private static readonly ENEMIES_PER_WAVE = 100;
    private static readonly INITIAL_ENEMY_COUNT = 50;
    private static readonly ENEMY_SPAWN_RATE_IN_MILISECONDS = 100;

    private enemiesPerWaveLine: Line;
    private wave: number;
    private lastSpawnTime: number;
    private enemiesToSpawn: number;

    constructor(scene: Scene) {
        super(scene, new EmptySprite());
        this.enemiesPerWaveLine = new Line(
            WaveManger.ENEMIES_PER_WAVE,
            WaveManger.INITIAL_ENEMY_COUNT
        );
        this.wave = 0;
        this.lastSpawnTime = Date.now();
        this.enemiesToSpawn = this.enemiesPerWaveLine.evaluate(this.wave);
    }

    update(): void {
        if (Date.now() > this.lastSpawnTime + WaveManger.ENEMY_SPAWN_RATE_IN_MILISECONDS) {
            if (this.enemiesToSpawn > 0) {
                this.scene.addObjectToScene(new Runner(this.scene));
                this.enemiesToSpawn--;
            }
            this.lastSpawnTime = Date.now();
        }
    }

    spawnEnemy() {}
}
