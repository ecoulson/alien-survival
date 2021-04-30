import { Circle } from "../../math/circle";
import { Segment } from "../../math/segment";
import { Vector2D } from "../../math/vector2d";
import { CirclePointCollisionStrategy } from "./circle-point-collision-strategy";
import { CollisionStrategy } from "./collision-strategy";
import { PointLineCollisionStrategy } from "./point-line-collision-strategy";

export class CircleLineCollisionStrategy implements CollisionStrategy<Circle, Segment> {
    private linePointCollisionStrategy: PointLineCollisionStrategy;
    private circlePointCollisionStrategy: CirclePointCollisionStrategy;

    constructor() {
        this.linePointCollisionStrategy = new PointLineCollisionStrategy();
        this.circlePointCollisionStrategy = new CirclePointCollisionStrategy();
    }

    doesCollide(circle: Circle, line: Segment) {
        let origin = line.getOrigin();
        let end = line.getEnd();
        let center = circle.getCenter();

        let isOriginInsideCircle: boolean = this.circlePointCollisionStrategy.doesCollide(
            circle,
            origin
        );
        let isEndInsideCircle: boolean = this.circlePointCollisionStrategy.doesCollide(circle, end);
        if (isOriginInsideCircle || isEndInsideCircle) {
            return true;
        }

        let lengthVector = end.subtract(origin);
        let lengthSquared = lengthVector.magnitudeSquared();
        let distanceFromCenterToLineOrigin = center.subtract(origin);
        let dot = lengthVector.dot(distanceFromCenterToLineOrigin);
        let closestPoint = new Vector2D(
            origin.x + (dot * (end.x - origin.x)) / lengthSquared,
            origin.y + (dot * (end.y - origin.y)) / lengthSquared
        );
        if (!this.linePointCollisionStrategy.doesCollide(closestPoint, line)) {
            return false;
        }

        let distanceFromClosestPointOnLineToCircle = new Vector2D(
            closestPoint.x - center.x,
            closestPoint.y - center.y
        );
        return distanceFromClosestPointOnLineToCircle.magnitude() <= circle.getRadius();
    }
}
