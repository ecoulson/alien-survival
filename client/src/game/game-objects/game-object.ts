import { Canvas } from "../../canvas/canvas";
import { Id } from "../../common/id";
import { Scene } from "../scenes/scene";
import { Point } from "./points";
import { Sprite } from "./sprite";

export abstract class GameObject {
    private gameObjectId: Id;
    protected position: Point;

    constructor(protected readonly scene: Scene, private sprite: Sprite) {
        this.gameObjectId = new Id();
        this.position = new Point(0, 0);
    }

    id(): Id {
        return this.gameObjectId;
    }

    render(canvas: Canvas): void {
        this.sprite.render(canvas, this.position);
    }

    public get transform(): Point {
        return this.position;
    }

    abstract update(): void;
}
