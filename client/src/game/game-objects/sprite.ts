import { Canvas } from "../../canvas/canvas";
import { Transform } from "./transform";

export interface Sprite {
    width(): number;
    height(): number;
    render(canvas: Canvas, transform: Transform): void;
}
