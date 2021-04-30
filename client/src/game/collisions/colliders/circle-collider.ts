import { GameObject } from "../../game-objects/game-object";
import { Circle } from "../../math/circle";
import { Vector2D } from "../../math/vector2d";
import { Scene } from "../../scenes/scene";
import { Collider } from "../collider";
import { BoxCircleCollisionStrategy } from "../strategies/box-circle-collision-strategy";
import { CircleCollisionStrategy } from "../strategies/circle-collision-strategy";
import { CircleLineCollisionStrategy } from "../strategies/circle-line-collision-strategy";
import { CirclePointCollisionStrategy } from "../strategies/circle-point-collision-strategy";
import { BoxCollider } from "./box-collider";
import { CircleColliderSprite } from "./circle-collider-sprite";
import { LineCollider } from "./line-collider";
import { PointCollider } from "./point-collider";
import { PolygonCollider } from "./polygon-collider";

export class CircleCollider extends GameObject implements Collider {
    private pointCollisionStrategy: CirclePointCollisionStrategy;
    private circleCollisionStrategy: CircleCollisionStrategy;
    private lineCollisionStrategy: CircleLineCollisionStrategy;
    private boxCollisionStrategy: BoxCircleCollisionStrategy;
    private offset: Vector2D;
    private radius: number;
    private circle: Circle;

    constructor(scene: Scene, private parent: GameObject, circle: Circle) {
        super(scene, new CircleColliderSprite(circle.getRadius()));
        this.offset = circle.getCenter();
        this.radius = circle.getRadius();
        this.circle = new Circle(parent.transform.position.add(this.offset), this.radius);
        this.scene.addObjectToScene(this);

        this.pointCollisionStrategy = new CirclePointCollisionStrategy();
        this.circleCollisionStrategy = new CircleCollisionStrategy();
        this.lineCollisionStrategy = new CircleLineCollisionStrategy();
        this.boxCollisionStrategy = new BoxCircleCollisionStrategy();
    }

    update() {
        this.transform.position = this.parent.transform.position;
        this.circle = new Circle(this.transform.position.add(this.offset), this.radius);
    }

    isCollidingWith(otherCollider: Collider): boolean {
        if (otherCollider instanceof LineCollider) {
            return this.lineCollisionStrategy.doesCollide(
                this.circle,
                (otherCollider as LineCollider).getSegment()
            );
        } else if (otherCollider instanceof CircleCollider) {
            return this.circleCollisionStrategy.doesCollide(
                this.circle,
                (otherCollider as CircleCollider).circle
            );
        } else if (otherCollider instanceof PointCollider) {
            return this.pointCollisionStrategy.doesCollide(
                this.circle,
                (otherCollider as PointCollider).getPoint()
            );
        } else if (otherCollider instanceof PolygonCollider) {
            return false;
        } else if (otherCollider instanceof BoxCollider) {
            return this.boxCollisionStrategy.doesCollide(
                (otherCollider as BoxCollider).getBox(),
                this.circle
            );
        }
        throw new Error("Unimplemented collision detection for line collider");
    }

    getCircle() {
        return this.circle;
    }
}
