import { Box } from "../../math/box";
import { Circle } from "../../math/circle";
import { Vector2D } from "../../math/vector2d";
import { CollisionStrategy } from "./collision-strategy";

export class BoxCircleCollisionStrategy implements CollisionStrategy<Box, Circle> {
    doesCollide(box: Box, circle: Circle) {
        let center = circle.getCenter();
        let origin = box.getOrigin();
        let size = box.getSize();
        let closestEdge = new Vector2D(
            this.getClosestX(center, origin, size),
            this.getClosestY(center, origin, size)
        );
        let distanceFromCenterToClosestEdge = center.subtract(closestEdge);

        return distanceFromCenterToClosestEdge.magnitudeSquared() <= circle.getRadiusSquared();
    }

    private getClosestX(center: Vector2D, origin: Vector2D, size: Vector2D) {
        if (center.x < origin.x) {
            return origin.x;
        } else if (center.x > origin.x + size.x) {
            return origin.x + size.x;
        }
        return center.x;
    }

    private getClosestY(center: Vector2D, origin: Vector2D, size: Vector2D) {
        if (center.y < origin.y) {
            return origin.y;
        } else if (center.y > origin.y + size.y) {
            return origin.y + size.y;
        }
        return center.y;
    }
}
