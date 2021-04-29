import { Scene } from "../scenes/scene";
import { Collidable } from "./collidable";
import { Collision } from "./collision";

export class CollisionDetector {
    constructor(private scene: Scene) {}

    calculateCollisions() {
        // use spatial
        const collidableObjects = this.getCollidableObjectsInScene();

    }

    private getCollidableObjectsInScene(): Collidable[] {
        return [];
    }

    private detectCollisions(): Collision[] {
        return [];
    }
}
