import { Canvas } from "../../../canvas/canvas";
import { Sprite } from "../../game-objects/sprite";
import { Transform } from "../../game-objects/transform";
import { Circle } from "../../math/circle";
import { Vector2D } from "../../math/vector2d";

export class CircleColliderSprite implements Sprite {
    constructor(private radius: number) {}

    width(): number {
        return 0;
    }
    height(): number {
        return 0;
    }
    render(canvas: Canvas, transform: Transform): void {
        canvas.translate(transform.position);
        canvas.drawCircleOutline(new Circle(Vector2D.zero, this.radius), "green");
    }
}
