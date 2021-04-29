import { Canvas } from "../../canvas/canvas";
import { Id } from "../../common/id";
import { Scene } from "../scenes/scene";
import { Angle } from "./angle";
import { AngleType } from "./angle-type";
import { Vector2D } from "./vector2d";
import { Sprite } from "./sprite";
import { Transform } from "./transform";

export abstract class GameObject {
    private gameObjectId: Id;
    private transform_: Transform;

    constructor(protected readonly scene: Scene, protected sprite: Sprite) {
        this.gameObjectId = new Id();
        this.transform_ = new Transform(Vector2D.zero, new Angle(AngleType.Radians, 0));
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
        this.scene.removeObjectFromScene(this);
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

    abstract update(): void;
}
