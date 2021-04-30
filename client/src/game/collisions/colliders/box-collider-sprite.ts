import { Canvas } from "../../../canvas/canvas";
import { Sprite } from "../../game-objects/sprite";
import { Transform } from "../../game-objects/transform";
import { Box } from "../../math/box";
import { Vector2D } from "../../math/vector2d";

export class BoxColliderSprite implements Sprite {
    constructor(private size: Vector2D) {}

    width(): number {
        return 0;
    }
    height(): number {
        return 0;
    }
    render(canvas: Canvas, transform: Transform): void {
        canvas.translate(transform.position);
        canvas.drawBoxOutline(new Box(Vector2D.zero, this.size), "green");
    }
}
