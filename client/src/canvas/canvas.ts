import { isNil } from "../common/util/isNil";
import { Angle } from "../game/math/angle";
import { AngleType } from "../game/math/angle-type";
import { Box } from "../game/math/box";
import { Circle } from "../game/math/circle";
import { Segment } from "../game/math/segment";
import { Vector2D } from "../game/math/vector2d";
import { CircleOptions } from "./circle-options";
import { RectangleOptions } from "./rectangle-options";

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

    save() {
        this.context.save();
    }

    restore() {
        this.context.restore();
    }

    drawCircle(circle: Circle, color: string) {
        this.context.beginPath();
        this.context.arc(
            circle.getCenter().x,
            circle.getCenter().y,
            circle.getRadius(),
            0,
            2 * Math.PI
        );
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }

    drawCircleOutline(circle: Circle, color: string) {
        this.context.beginPath();
        this.context.arc(
            circle.getCenter().x,
            circle.getCenter().y,
            circle.getRadius(),
            0,
            2 * Math.PI
        );
        this.context.strokeStyle = color;
        this.context.lineWidth = 3;
        this.context.stroke();
        this.context.closePath();
    }

    drawBox(box: Box, color: string) {
        this.context.beginPath();
        let origin = box.getOrigin();
        let size = box.getSize();
        this.context.rect(origin.x, origin.y, size.x, size.y);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }

    drawBoxOutline(box: Box, color: string) {
        this.context.beginPath();
        let origin = box.getOrigin();
        let size = box.getSize();
        this.context.rect(origin.x, origin.y, size.x, size.y);
        this.context.strokeStyle = color;
        this.context.stroke();
        this.context.closePath();
    }

    drawSegment(segment: Segment, color: string) {
        this.context.beginPath();
        const origin = segment.getOrigin();
        const end = segment.getEnd();
        this.context.lineWidth = 3;
        this.context.moveTo(origin.x, origin.y);
        this.context.lineTo(end.x, end.y);
        this.context.strokeStyle = color;
        this.context.stroke();
        this.context.closePath();
    }

    translate(point: Vector2D) {
        this.context.translate(point.x, point.y);
    }

    rotate(angle: Angle) {
        if (angle.type === AngleType.Degrees) {
            this.context.rotate((angle.value * Math.PI) / 180);
        } else {
            this.context.rotate(angle.value);
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.size[0], this.size[1]);
    }

    on(canvasEvent: string, handler: (event: Event) => void) {
        this.canvasElement.addEventListener(canvasEvent, handler);
    }

    getPosition() {
        return new Vector2D(this.boundingBox.left, this.boundingBox.top);
    }
}
