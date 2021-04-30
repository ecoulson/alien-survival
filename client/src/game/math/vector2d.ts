import { Angle } from "./angle";
import { AngleType } from "./angle-type";

export class Vector2D {
    public static get zero() {
        return new Vector2D(0, 0);
    }

    private coordinate: [number, number];

    constructor(x: number, y: number) {
        this.coordinate = [x, y];
    }

    public get x(): number {
        return this.coordinate[0];
    }

    public get y(): number {
        return this.coordinate[1];
    }

    add(other: Vector2D) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector2D) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    scale(scaler: number) {
        return new Vector2D(this.x * scaler, this.x * scaler);
    }

    angle() {
        return new Angle(AngleType.Radians, Math.atan2(this.y, this.x));
    }

    magnitude() {
        return Math.sqrt(this.magnitudeSquared());
    }

    magnitudeSquared() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    serialize() {
        return {
            x: this.x,
            y: this.y
        };
    }

    cross(other: Vector2D) {
        return this.x * other.y - this.y * other.x;
    }

    dot(other: Vector2D) {
        return this.x * other.x + this.y * other.y;
    }

    unit() {
        const magnitude = this.magnitude();
        return new Vector2D(this.x / magnitude, this.y / magnitude);
    }

    equals(other: Vector2D) {
        return this.x === other.x && this.y === other.y;
    }
}
