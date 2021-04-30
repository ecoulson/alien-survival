import { Canvas } from "../../canvas/canvas";
import { Vector2D } from "../math/vector2d";
import { Sprite } from "../game-objects/sprite";
import { Transform } from "../game-objects/transform";
import { Box } from "../math/box";

export class BulletSprite implements Sprite {
    width(): number {
        return 5;
    }

    height(): number {
        return 10;
    }

    render(canvas: Canvas, transform: Transform): void {
        canvas.translate(this.centerOfRotation(transform));
        canvas.rotate(transform.rotation);
        canvas.drawBox(new Box(Vector2D.zero, new Vector2D(this.width(), this.height())), "red");
    }

    centerOfRotation(transform: Transform): Vector2D {
        return new Vector2D(
            transform.position.x + this.width() / 2,
            transform.position.y + this.height() / 2
        );
    }
}
