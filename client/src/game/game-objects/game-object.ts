import { Canvas } from "../../canvas/canvas";
import { Id } from "../../common/id";
import { Scene } from "../scenes/scene";
import { Angle } from "../math/angle";
import { AngleType } from "../math/angle-type";
import { Vector2D } from "../math/vector2d";
import { Sprite } from "./sprite";
import { Transform } from "./transform";
import { Collidable } from "../collisions/collidable";
import { EmptyCollider } from "../collisions/colliders/empty-collider";
import { Collider } from "../collisions/collider";
import { EmptySprite } from "../sprites/empty-sprite";

export abstract class GameObject implements Collidable {
    private gameObjectId: Id;
    private transform_: Transform;
    private collider: Collider;
    protected sprite: Sprite;
    private destroyed_: boolean;

    constructor(protected readonly scene: Scene, sprite?: Sprite, collider?: Collider) {
        this.gameObjectId = new Id();
        this.transform_ = new Transform(Vector2D.zero, new Angle(AngleType.Radians, 0));
        this.sprite = sprite ? sprite : new EmptySprite();
        this.collider = collider ? collider : new EmptyCollider();
        this.destroyed_ = true;
    }

    getCollider() {
        return this.collider;
    }

    setCollider(collider: Collider) {
        this.collider = collider;
    }

    objectId(): Id {
        return this.gameObjectId;
    }

    render(canvas: Canvas): void {
        this.sprite.render(canvas, this.transform);
    }

    setPosition(position: Vector2D) {
        this.transform.position = position;
    }

    destroy() {
        if (this.destroyed_) {
            this.collider.destroy();
            this.scene.removeObjectFromScene(this);
        }
    }

    getSprite() {
        return this.sprite;
    }

    public get transform(): Transform {
        return this.transform_;
    }

    public set transform(newTransform) {
        this.transform_ = newTransform;
    }

    onCollision(otherObject: GameObject) {}

    abstract update(): void;
}
