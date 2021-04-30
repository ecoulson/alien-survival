import { Segment } from "../../math/segment";
import { Vector2D } from "../../math/vector2d";
import { CollisionStrategy } from "./collision-strategy";

export class PointLineCollisionStrategy implements CollisionStrategy<Vector2D, Segment> {
    doesCollide(point: Vector2D, line: Segment): boolean {
        let endSubtractOrigin = line.getEnd().subtract(line.getOrigin());
        let pointSubtractOrigin = point.subtract(line.getOrigin());
        let crossProduct = Math.abs(endSubtractOrigin.cross(pointSubtractOrigin));

        if (crossProduct > Number.EPSILON) {
            return false;
        }

        let dotProduct = endSubtractOrigin.dot(pointSubtractOrigin);
        if (dotProduct < 0) {
            return false;
        }

        if (dotProduct > line.lengthSquared()) {
            return false;
        }

        return true;
    }
}
