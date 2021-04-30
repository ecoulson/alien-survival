import { GameObject } from "../../game-objects/game-object";
import { Box } from "../../math/box";
import { Vector2D } from "../../math/vector2d";
import { Scene } from "../../scenes/scene";
import { Collider } from "../collider";
import { BoxCircleCollisionStrategy } from "../strategies/box-circle-collision-strategy";
import { BoxCollisionStrategy } from "../strategies/box-collision-strategy";
import { BoxLineCollisionStrategy } from "../strategies/box-line-collision-strategy";
import { BoxPointCollisionStrategy } from "../strategies/box-point-collision-strategy";
import { BoxColliderSprite } from "./box-collider-sprite";
import { CircleCollider } from "./circle-collider";
import { LineCollider } from "./line-collider";
import { PointCollider } from "./point-collider";
import { PolygonCollider } from "./polygon-collider";

export class BoxCollider extends GameObject implements Collider {
    private pointCollisionStrategy: BoxPointCollisionStrategy;
    private boxCollisionStrategy: BoxCollisionStrategy;
    private circleCollisionStrategy: BoxCircleCollisionStrategy;
    private lineCollisionStrategy: BoxLineCollisionStrategy;

    constructor(scene: Scene, private parent: GameObject, private box: Box) {
        super(scene, new BoxColliderSprite(box.getSize()));

        this.pointCollisionStrategy = new BoxPointCollisionStrategy();
        this.boxCollisionStrategy = new BoxCollisionStrategy();
        this.circleCollisionStrategy = new BoxCircleCollisionStrategy();
        this.lineCollisionStrategy = new BoxLineCollisionStrategy();
        this.scene.addObjectToScene(this);
    }

    update() {
        this.transform.position = this.parent.transform.position;
        this.box = new Box(
            this.box.getOrigin().subtract(this.transform.position),
            this.box.getSize()
        );
    }

    getBox() {
        return this.box;
    }

    isCollidingWith(otherCollider: Collider): boolean {
        if (otherCollider instanceof LineCollider) {
            return this.lineCollisionStrategy.doesCollide(
                this.box,
                (otherCollider as LineCollider).getSegment()
            );
        } else if (otherCollider instanceof CircleCollider) {
            return this.circleCollisionStrategy.doesCollide(
                this.box,
                (otherCollider as CircleCollider).getCircle()
            );
        } else if (otherCollider instanceof PointCollider) {
            return this.pointCollisionStrategy.doesCollide(
                this.box,
                (otherCollider as PointCollider).getPoint()
            );
        } else if (otherCollider instanceof PolygonCollider) {
            return false;
        } else if (otherCollider instanceof BoxCollider) {
            return this.boxCollisionStrategy.doesCollide(
                this.box,
                (otherCollider as BoxCollider).getBox()
            );
        }
        throw new Error("Unimplemented collision detection for line collider");
    }
}
