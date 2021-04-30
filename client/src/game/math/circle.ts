import { Vector2D } from "./vector2d";

export class Circle {
    constructor(private center: Vector2D, private radius: number) {
        if (radius < 0) {
            throw new Error("Can not create a circle with negative radius");
        }
    }

    getCenter() {
        return this.center;
    }

    getRadius() {
        return this.radius;
    }

    getRadiusSquared() {
        return Math.pow(this.radius, 2);
    }
}
