import { Id } from "../../common/id";
import { GameObject } from "../game-objects/game-object";
import { Vector2D } from "../math/vector2d";
import { Sprite } from "../game-objects/sprite";
import { BasicGun } from "../gun/basic-gun";
import { Scene } from "../scenes/scene";
import { BoxCollider } from "../collisions/colliders/box-collider";
import { Box } from "../math/box";
import { CircleCollider } from "../collisions/colliders/circle-collider";
import { Circle } from "../math/circle";

export class Player extends GameObject {
    private gun: BasicGun;

    constructor(scene: Scene, sprite: Sprite, private name: string, private playerId: Id) {
        super(scene, sprite);
        this.gun = new BasicGun(scene, this);
        this.scene.addObjectToScene(this.gun);
        this.setCollider(new CircleCollider(scene, this, new Circle(Vector2D.zero, 25)));
    }

    entityId() {
        return this.playerId;
    }

    moveTo(point: Vector2D) {
        this.setPosition(point);
    }

    shoot() {
        this.gun.fire();
    }

    serialize() {
        return {
            id: this.playerId.value,
            name: this.name,
            transform: this.transform.serialize()
        };
    }

    update(): void {}
}
