import { GameObject } from "../game-objects/game-object";
import { Scene } from "../scenes/scene";
import { Collision } from "./collision";
import { EmptyCollider } from "./colliders/empty-collider";

export class CollisionDetector {
    constructor(private scene: Scene) {}

    calculateCollisions() {
        // TODO: litterally use any more efficient collision detection algo.
        //TODO: eventually use spatial hashing to only grab collisions that need to occur
        const collidableObjects = this.getCollidableObjectsInScene();
        const collisions = this.detectCollisions(collidableObjects);
        this.notifyCollidedObjects(collisions);
    }

    private getCollidableObjectsInScene(): GameObject[] {
        return this.scene
            .getObjectsInScene()
            .filter((obj) => !(obj.getCollider() instanceof EmptyCollider));
    }

    private detectCollisions(collidableObjects: GameObject[]): Collision[] {
        const collisions: Collision[] = [];
        for (let i = 0; i < collidableObjects.length; i++) {
            for (let j = i + 1; j < collidableObjects.length; j++) {
                if (this.isColliding(collidableObjects[i], collidableObjects[j])) {
                    collisions.push(new Collision(collidableObjects[i], collidableObjects[j]));
                }
            }
        }
        return collisions;
    }

    private isColliding(objA: GameObject, objB: GameObject) {
        return objA.getCollider().isCollidingWith(objB.getCollider());
    }

    private notifyCollidedObjects(collisions: Collision[]) {
        collisions.forEach((collision) => {
            collision.pair[0].onCollision(collision.pair[1]);
            collision.pair[1].onCollision(collision.pair[0]);
        });
    }
}
