import { Serializable } from "../../common/serializable";
import { Angle } from "./angle";
import { AngleType } from "./angle-type";
import { Vector2D } from "./vector2d";

export class Transform implements Serializable {
    public static get zero() {
        return new Transform(
            new Vector2D({
                x: 0,
                y: 0
            }),
            new Angle(AngleType.Radians, 0)
        );
    }

    constructor(public position: Vector2D, public rotation: Angle) {}

    serialize() {
        return {
            position: this.position.serialize(),
            rotation: this.rotation
        };
    }
}
