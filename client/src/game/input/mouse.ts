import { Point } from "../game-objects/points";

export class Mouse {
    private coords: Point;

    constructor() {
        this.coords = new Point(0, 0);

        window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    private handleMouseUp(event: Event) {
        const mouseEvent = event as MouseEvent;
        this.coords = new Point(mouseEvent.x, mouseEvent.y);
    }

    public get position(): Point {
        return this.coords;
    }
}
