import { GameObject } from "../game-objects/game-object";
import { Vector2D } from "../game-objects/vector2d";
import { Scene } from "../scenes/scene";
import { RunnerSprite } from "./runner-sprite";

export class Runner extends GameObject {
    private speed: number;

    constructor(scene: Scene) {
        super(scene, new RunnerSprite());
        let x = Math.floor(Math.random() * 600) + 40;
        let y = Math.floor(Math.random() * 600) + 40;
        this.setPosition(new Vector2D(x, y));
        this.speed = 1;
    }

    update(): void {
        const velocity = this.calculateVelocity();
        this.setPosition(
            new Vector2D(
                this.transform.position.x - velocity.x,
                this.transform.position.y - velocity.y
            )
        );
    }

    calculateVelocity() {
        const radians = this.transform.rotation.toRadians();
        return new Vector2D(
            Math.cos(radians.value + Math.PI / 2) * this.speed,
            Math.sin(radians.value + Math.PI / 2) * this.speed
        );
    }
}
