import { Canvas } from "../../canvas/canvas";
import { Vector2D } from "../math/vector2d";
import { Sprite } from "../game-objects/sprite";
import { Transform } from "../game-objects/transform";
import { Box } from "../math/box";

export class BasicGunSprite implements Sprite {
    width(): number {
        return 10;
    }

    height(): number {
        return 25;
    }

    render(canvas: Canvas, transform: Transform): void {
        canvas.translate(transform.position);
        canvas.rotate(transform.rotation);
        canvas.drawBox(
            new Box(new Vector2D(0, -this.height()), new Vector2D(this.width(), this.height())),
            "yellow"
        );
    }
}
