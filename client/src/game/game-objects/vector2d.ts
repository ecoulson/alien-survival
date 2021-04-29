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
        return new Vector2D(
            this.coordinate[0] + other.coordinate[0],
            this.coordinate[1] + other.coordinate[1]
        );
    }

    subtract(other: Vector2D) {
        return new Vector2D(
            this.coordinate[0] - other.coordinate[0],
            this.coordinate[1] - other.coordinate[1]
        );
    }

    maginitude() {
        return Math.sqrt(Math.pow(this.coordinate[0], 2) + Math.pow(this.coordinate[1], 2));
    }

    serialize() {
        return {
            x: this.coordinate[0],
            y: this.coordinate[1]
        };
    }
}
