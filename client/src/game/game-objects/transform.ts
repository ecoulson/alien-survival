import { Angle } from "../math/angle";
import { Vector2D } from "../math/vector2d";

export class Transform {
    constructor(public position: Vector2D, public rotation: Angle) {}

    serialize() {
        return {
            position: this.position.serialize(),
            rotation: this.rotation
        };
    }
}
