import { GameObject } from "../game-objects/game-object";
import { Vector2D } from "../game-objects/vector2d";
import { Transform } from "../game-objects/transform";
import { Scene } from "../scenes/scene";
import { BulletSprite } from "./bullet-sprite";

export class Bullet extends GameObject {
    private speed: number;

    constructor(scene: Scene, parent: Transform) {
        super(scene, new BulletSprite());
        this.speed = 60;
        this.transform = new Transform(
            new Vector2D(parent.position.x, parent.position.y),
            parent.rotation
        );
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

    private calculateVelocity(): Vector2D {
        const radians = this.transform.rotation.toRadians();
        return new Vector2D(
            Math.cos(radians.value + Math.PI / 2) * this.speed,
            Math.sin(radians.value + Math.PI / 2) * this.speed
        );
    }
}
