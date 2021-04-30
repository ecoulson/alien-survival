import { Box } from "../../math/box";
import { Segment } from "../../math/segment";
import { Vector2D } from "../../math/vector2d";
import { CollisionStrategy } from "./collision-strategy";
import { LineCollisionStrategy } from "./line-collision-strategy";

export class BoxLineCollisionStrategy implements CollisionStrategy<Box, Segment> {
    private lineCollisionStrategy: LineCollisionStrategy;

    constructor() {
        this.lineCollisionStrategy = new LineCollisionStrategy();
    }

    doesCollide(box: Box, line: Segment) {
        const origin = box.getOrigin();
        const size = box.getSize();
        const isIntersectingLeftSide = this.lineCollisionStrategy.doesCollide(
            line,
            new Segment(new Vector2D(origin.x, origin.y), new Vector2D(origin.x, origin.y + size.y))
        );
        const isIntersectingRightSide = this.lineCollisionStrategy.doesCollide(
            line,
            new Segment(
                new Vector2D(origin.x + size.x, origin.y),
                new Vector2D(origin.x + size.x, origin.y + size.y)
            )
        );
        const isIntersectingTopSide = this.lineCollisionStrategy.doesCollide(
            line,
            new Segment(new Vector2D(origin.x, origin.y), new Vector2D(origin.x + size.x, origin.y))
        );
        const isIntersectingBottomSide = this.lineCollisionStrategy.doesCollide(
            line,
            new Segment(
                new Vector2D(origin.x, origin.y + size.y),
                new Vector2D(origin.x + size.x, origin.y + size.y)
            )
        );
        return (
            isIntersectingLeftSide ||
            isIntersectingRightSide ||
            isIntersectingTopSide ||
            isIntersectingBottomSide
        );
    }
}
