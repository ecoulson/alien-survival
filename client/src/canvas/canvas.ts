import { isNil } from "../common/util/isNil";
import { Point } from "../game/game-objects/points";

export interface CircleOptions {
    x: number;
    y: number;
    radius: number;
    color: string;
}

export class Canvas {
    private context: CanvasRenderingContext2D;
    private boundingBox: DOMRect;
    private size: [number, number];

    constructor(private canvasElement: HTMLCanvasElement) {
        this.size = [0, 0];
        if (isNil(canvasElement)) {
            throw new Error("Canvas element must not be nil");
        }
        let context = canvasElement.getContext("2d");
        if (!context) {
            throw new Error("Canvas element must have a 2D rendering context");
        }

        this.resize();
        this.context = context;
        this.boundingBox = canvasElement.getBoundingClientRect();

        window.addEventListener("resize", this.resize.bind(this));
    }

    private resize() {
        this.canvasElement.width = window.innerWidth;
        this.canvasElement.height = window.innerHeight;

        this.size = [this.canvasElement.width, this.canvasElement.height];
    }

    width() {
        return this.size[0];
    }

    height() {
        return this.size[1];
    }

    drawCircle({ x, y, radius, color }: CircleOptions) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }

    clear() {
        this.context.clearRect(0, 0, this.size[0], this.size[1]);
    }

    on(canvasEvent: string, handler: (event: Event) => void) {
        this.canvasElement.addEventListener(canvasEvent, handler);
    }

    getPosition() {
        return new Point(this.boundingBox.left, this.boundingBox.top);
    }
}
