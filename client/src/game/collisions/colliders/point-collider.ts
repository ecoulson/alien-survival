import { CircleCollider } from "./circle-collider";
import { Collider } from "../collider";
import { LineCollider } from "./line-collider";
import { PolygonCollider } from "./polygon-collider";
import { BoxCollider } from "./box-collider";
import { CirclePointCollisionStrategy } from "../strategies/circle-point-collision-strategy";
import { Vector2D } from "../../math/vector2d";
import { PointCollisionStrategy } from "../strategies/point-collision-strategy";
import { PointLineCollisionStrategy } from "../strategies/point-line-collision-strategy";
import { BoxPointCollisionStrategy } from "../strategies/box-point-collision-strategy";
import { GameObject } from "../../game-objects/game-object";
import { Scene } from "../../scenes/scene";

export class PointCollider extends GameObject implements Collider {
    private circleCollisionStrategy: CirclePointCollisionStrategy;
    private pointCollisionStrategy: PointCollisionStrategy;
    private lineCollisionStrategy: PointLineCollisionStrategy;
    private boxCollisionStrategy: BoxPointCollisionStrategy;
    private point: Vector2D;

    constructor(scene: Scene, private parent: GameObject, private offset: Vector2D) {
        super(scene);
        this.scene.addObjectToScene(this);
        this.point = offset.add(parent.transform.position);
        this.circleCollisionStrategy = new CirclePointCollisionStrategy();
        this.pointCollisionStrategy = new PointCollisionStrategy();
        this.lineCollisionStrategy = new PointLineCollisionStrategy();
        this.boxCollisionStrategy = new BoxPointCollisionStrategy();
    }

    update() {
        this.transform.position = this.parent.transform.position;
        this.point = this.transform.position.add(this.offset);
    }

    isCollidingWith(otherCollider: Collider): boolean {
        if (otherCollider instanceof LineCollider) {
            return this.lineCollisionStrategy.doesCollide(
                this.point,
                (otherCollider as LineCollider).getSegment()
            );
        } else if (otherCollider instanceof CircleCollider) {
            return this.circleCollisionStrategy.doesCollide(
                (otherCollider as CircleCollider).getCircle(),
                this.point
            );
        } else if (otherCollider instanceof PointCollider) {
            return this.pointCollisionStrategy.doesCollide(
                this.point,
                (otherCollider as PointCollider).point
            );
        } else if (otherCollider instanceof PolygonCollider) {
            return false;
        } else if (otherCollider instanceof BoxCollider) {
            return this.boxCollisionStrategy.doesCollide(
                (otherCollider as BoxCollider).getBox(),
                this.point
            );
        }
        throw new Error("Unimplemented collision detection for line collider");
    }

    getPoint() {
        return this.point;
    }
}
