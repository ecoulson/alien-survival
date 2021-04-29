import { Canvas } from "../../canvas/canvas";
import { Vector2D } from "../game-objects/vector2d";
import { Sprite } from "../game-objects/sprite";
import { Transform } from "../game-objects/transform";

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
        canvas.drawRect({
            point: new Vector2D(0, -this.height()),
            width: this.width(),
            height: this.height(),
            color: "yellow"
        });
    }
}
