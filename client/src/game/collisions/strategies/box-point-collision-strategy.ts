import { Box } from "../../math/box";
import { Vector2D } from "../../math/vector2d";
import { CollisionStrategy } from "./collision-strategy";

export class BoxPointCollisionStrategy implements CollisionStrategy<Box, Vector2D> {
    doesCollide(box: Box, point: Vector2D): boolean {
        let origin = box.getOrigin();
        let size = box.getSize();
        return (
            point.x >= origin.x &&
            point.x <= origin.x + size.x &&
            point.y >= origin.y &&
            point.y <= origin.y + size.y
        );
    }
}
