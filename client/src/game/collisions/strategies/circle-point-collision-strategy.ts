import { Circle } from "../../math/circle";
import { Vector2D } from "../../math/vector2d";
import { CollisionStrategy } from "./collision-strategy";

export class CirclePointCollisionStrategy implements CollisionStrategy<Circle, Vector2D> {
    doesCollide(circle: Circle, point: Vector2D): boolean {
        return circle.getCenter().subtract(point).magnitudeSquared() <= circle.getRadiusSquared();
    }
}
