import { Vector2D } from "../../math/vector2d";
import { CollisionStrategy } from "./collision-strategy";

export class PointCollisionStrategy implements CollisionStrategy<Vector2D, Vector2D> {
    doesCollide(pointA: Vector2D, pointB: Vector2D): boolean {
        return pointA.equals(pointB);
    }
}
