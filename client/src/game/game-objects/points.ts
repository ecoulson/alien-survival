export class Point {
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

    serialize() {
        return {
            x: this.coordinate[0],
            y: this.coordinate[1]
        };
    }
}
