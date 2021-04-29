import { Angle } from "./angle";
import { Vector2D } from "./vector2d";

export class Transform {
    constructor(public position: Vector2D, public rotation: Angle) {}

    serialize() {
        return {
            position: this.position.serialize(),
            rotation: this.rotation
        };
    }
}
