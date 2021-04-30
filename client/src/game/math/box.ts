import { Vector2D } from "./vector2d";

export class Box {
    constructor(private origin: Vector2D, private size: Vector2D) {
        if (size.x < 0) {
            throw new Error("Can not create a negative width box");
        }
        if (size.y < 0) {
            throw new Error("Can not create a negative height box");
        }
    }

    getOrigin() {
        return this.origin;
    }

    getSize() {
        return this.size;
    }
}
