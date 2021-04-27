import { Id } from "../../common/id";
import { GameObject } from "../game-objects/game-object";
import { Point } from "../game-objects/points";
import { Sprite } from "../game-objects/sprite";
import { Scene } from "../scenes/scene";

export class Player extends GameObject {
    constructor(scene: Scene, sprite: Sprite, private name: string, private playerId: Id) {
        super(scene, sprite);
    }

    entityId() {
        return this.playerId;
    }

    getPosition(): Point {
        return this.position;
    }

    moveTo(point: Point) {
        this.position = point;
    }

    serialize() {
        return {
            id: this.playerId.value,
            name: this.name,
            position: this.transform.serialize()
        };
    }

    update(): void {}
}
