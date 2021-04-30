import { Vector2D } from "../math/vector2d";
import { MouseButton } from "./mouse-button";
import { MouseListener } from "./mouse-listener";

export class Mouse {
    private coords: Vector2D;
    private pressedMap: Map<MouseButton, boolean>;

    constructor() {
        this.coords = new Vector2D(0, 0);
        this.pressedMap = new Map<MouseButton, boolean>();

        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
        window.addEventListener("mousedown", this.handleMouseDown.bind(this));
        window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    private handleMouseMove(event: Event) {
        const mouseEvent = event as MouseEvent;
        this.coords = new Vector2D(mouseEvent.x, mouseEvent.y);
    }

    private handleMouseDown(event: Event) {
        const mouseEvent = event as MouseEvent;
        if (mouseEvent.buttons === 1) {
            this.pressedMap.set(MouseButton.Left, true);
        } else {
            this.pressedMap.set(MouseButton.Right, true);
        }
    }

    private handleMouseUp(event: Event) {
        const mouseEvent = event as MouseEvent;
        if (mouseEvent.buttons === 1) {
            this.pressedMap.set(MouseButton.Left, false);
        } else {
            this.pressedMap.set(MouseButton.Left, false);
        }
    }

    public isPressed(button: MouseButton) {
        return this.pressedMap.get(button);
    }

    public get position(): Vector2D {
        return this.coords;
    }
}
