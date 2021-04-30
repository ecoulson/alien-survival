import { Segment } from "../../math/segment";
import { CircleCollider } from "./circle-collider";
import { Collider } from "../collider";
import { LineCollisionStrategy } from "../strategies/line-collision-strategy";
import { PointCollider } from "./point-collider";
import { PolygonCollider } from "./polygon-collider";
import { PointLineCollisionStrategy } from "../strategies/point-line-collision-strategy";
import { CircleLineCollisionStrategy } from "../strategies/circle-line-collision-strategy";
import { BoxCollider } from "./box-collider";
import { BoxLineCollisionStrategy } from "../strategies/box-line-collision-strategy";
import { GameObject } from "../../game-objects/game-object";
import { Scene } from "../../scenes/scene";

export class LineCollider extends GameObject implements Collider {
    private lineCollisionStrategy: LineCollisionStrategy;
    private pointCollisionStrategy: PointLineCollisionStrategy;
    private circleCollisionStrategy: CircleLineCollisionStrategy;
    private boxCollisionStrategy: BoxLineCollisionStrategy;

    constructor(scene: Scene, private parent: GameObject, private segment: Segment) {
        super(scene);
        this.segment = new Segment(
            segment.getOrigin().add(parent.transform.position),
            segment.getEnd().add(parent.transform.position)
        );
        this.scene.addObjectToScene(this);
        this.lineCollisionStrategy = new LineCollisionStrategy();
        this.pointCollisionStrategy = new PointLineCollisionStrategy();
        this.circleCollisionStrategy = new CircleLineCollisionStrategy();
        this.boxCollisionStrategy = new BoxLineCollisionStrategy();
    }

    update() {
        this.transform.position = this.parent.transform.position;
        this.segment = new Segment(
            this.segment.getOrigin().subtract(this.transform.position),
            this.segment.getEnd().add(this.transform.position)
        );
    }

    getSegment() {
        return this.segment;
    }

    isCollidingWith(otherCollider: Collider): boolean {
        if (otherCollider instanceof LineCollider) {
            return this.lineCollisionStrategy.doesCollide(
                this.segment,
                (otherCollider as LineCollider).getSegment()
            );
        } else if (otherCollider instanceof CircleCollider) {
            return this.circleCollisionStrategy.doesCollide(
                (otherCollider as CircleCollider).getCircle(),
                this.segment
            );
        } else if (otherCollider instanceof PointCollider) {
            return this.pointCollisionStrategy.doesCollide(
                (otherCollider as PointCollider).getPoint(),
                this.segment
            );
        } else if (otherCollider instanceof PolygonCollider) {
            return false;
        } else if (otherCollider instanceof BoxCollider) {
            return this.boxCollisionStrategy.doesCollide(
                (otherCollider as BoxCollider).getBox(),
                this.segment
            );
        }
        throw new Error("Unimplemented collision detection for line collider");
    }
}
