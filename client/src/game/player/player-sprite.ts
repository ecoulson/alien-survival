import { Canvas } from "../../canvas/canvas";
import { Vector2D } from "../game-objects/vector2d";
import { Sprite } from "../game-objects/sprite";
import { Transform } from "../game-objects/transform";

export class PlayerSprite implements Sprite {
    constructor() {}

    width(): number {
        return 50;
    }
    height(): number {
        return 50;
    }

    render(canvas: Canvas, transform: Transform): void {
        canvas.translate(transform.position);
        canvas.rotate(transform.rotation);
        canvas.drawCircle({
            center: Vector2D.zero,
            radius: 25,
            color: "green"
        });
    }
}
