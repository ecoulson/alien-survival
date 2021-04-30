import { Box } from "../../math/box";
import { CollisionStrategy } from "./collision-strategy";

export class BoxCollisionStrategy implements CollisionStrategy<Box, Box> {
    doesCollide(boxA: Box, boxB: Box) {
        let originA = boxA.getOrigin();
        let sizeA = boxA.getSize();
        let originB = boxB.getOrigin();
        let sizeB = boxB.getSize();
        return (
            originA.x + sizeA.x >= originB.x &&
            originA.x <= originB.x + sizeB.x &&
            originA.y + sizeA.y >= originB.y &&
            originA.y <= originB.y + sizeB.y
        );
    }
}
