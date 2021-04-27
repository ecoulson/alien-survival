import { Canvas } from "../../canvas/canvas";
import { Point } from "../game-objects/points";
import { Sprite } from "../game-objects/sprite";

export class PlayerSprite implements Sprite {
    private color: string;

    constructor() {
        this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    width(): number {
        return 100;
    }
    height(): number {
        return 100;
    }

    render(canvas: Canvas, point: Point): void {
        canvas.drawCircle({
            x: point.x,
            y: point.y,
            radius: 50,
            color: this.color
        });
    }
}
