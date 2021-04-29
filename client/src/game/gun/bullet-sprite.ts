import { Canvas } from "../../canvas/canvas";
import { Vector2D } from "../game-objects/vector2d";
import { Sprite } from "../game-objects/sprite";
import { Transform } from "../game-objects/transform";

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
        canvas.drawRect({
            point: Vector2D.zero,
            width: this.width(),
            height: this.height(),
            color: "red"
        });
    }

    centerOfRotation(transform: Transform): Vector2D {
        return new Vector2D(
            transform.position.x + this.width() / 2,
            transform.position.y + this.height() / 2
        );
    }
}
