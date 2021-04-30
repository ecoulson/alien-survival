import { CircleCollider } from "../collisions/colliders/circle-collider";
import { GameObject } from "../game-objects/game-object";
import { Bullet } from "../gun/bullet";
import { Circle } from "../math/circle";
import { Vector2D } from "../math/vector2d";
import { Scene } from "../scenes/scene";
import { RunnerSprite } from "./runner-sprite";

export class Runner extends GameObject {
    private speed: number;

    constructor(scene: Scene) {
        super(scene, new RunnerSprite());
        let x = Math.floor(Math.random() * 1500) + 40;
        let y = Math.floor(Math.random() * 1000) + 40;
        this.setPosition(new Vector2D(x, y));
        this.speed = 1;
        this.setCollider(new CircleCollider(scene, this, new Circle(Vector2D.zero, 20)));
    }

    onCollision(object: GameObject) {
        if (object instanceof Bullet) {
            console.log("ive been shot retard");
            this.destroy();
        }
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
