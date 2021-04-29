import { Canvas } from "../../canvas/canvas";
import { Sprite } from "../game-objects/sprite";
import { Transform } from "../game-objects/transform";
import { Vector2D } from "../game-objects/vector2d";

export class RunnerSprite implements Sprite {
    width(): number {
        return 40;
    }

    height(): number {
        return 40;
    }

    render(canvas: Canvas, transform: Transform): void {
        canvas.translate(transform.position);
        canvas.rotate(transform.rotation);
        canvas.drawCircle({
            center: Vector2D.zero,
            radius: 20,
            color: "red"
        });
    }
}
