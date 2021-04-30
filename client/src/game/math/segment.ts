import { Vector2D } from "./vector2d";

export class Segment {
    constructor(private origin: Vector2D, private end: Vector2D) {}

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared() {
        return Math.pow(this.end.x - this.origin.x, 2) + Math.pow(this.end.y - this.origin.y, 2);
    }

    getOrigin(): Vector2D {
        return this.origin;
    }

    getEnd() {
        return this.end;
    }

    normal() {
        return new Segment(
            new Vector2D(this.origin.y, this.end.x),
            new Vector2D(this.end.y, this.origin.x)
        );
    }

    center() {
        return new Vector2D((this.end.x - this.origin.x) / 2, (this.end.y - this.origin.y) / 2);
    }

    unit() {
        const length = this.length();
        return new Vector2D(
            (this.end.x - this.origin.x) / length,
            (this.end.y - this.origin.y) / length
        );
    }

    scale(scalar: number) {
        return new Segment(this.origin.scale(1), this.end.scale(scalar));
    }
}
