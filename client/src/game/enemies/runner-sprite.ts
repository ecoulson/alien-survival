import { Canvas } from "../../canvas/canvas";
import { Sprite } from "../game-objects/sprite";
import { Transform } from "../game-objects/transform";
import { Circle } from "../math/circle";
import { Vector2D } from "../math/vector2d";

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
        canvas.drawCircle(new Circle(Vector2D.zero, 20), "red");
    }
}
