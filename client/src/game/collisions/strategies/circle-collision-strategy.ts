import { Circle } from "../../math/circle";
import { CollisionStrategy } from "./collision-strategy";

export class CircleCollisionStrategy implements CollisionStrategy<Circle, Circle> {
    doesCollide(circleA: Circle, circleB: Circle): boolean {
        let distanceFromAToB = circleA.getCenter().subtract(circleB.getCenter()).magnitude();
        return distanceFromAToB < circleA.getRadius() + circleB.getRadius();
    }
}
