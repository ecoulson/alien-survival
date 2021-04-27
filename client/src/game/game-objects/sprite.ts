import { Canvas } from "../../canvas/canvas";
import { Point } from "./points";

export interface Sprite {
    width(): number;
    height(): number;
    render(canvas: Canvas, point: Point): void;
}
