import { AngleType } from "./angle-type";

export class Angle {
    constructor(public readonly type: AngleType, public readonly value: number) {}

    negative() {
        return new Angle(this.type, -this.value);
    }

    toRadians() {
        if (this.type === AngleType.Degrees) {
            return new Angle(AngleType.Radians, (this.value * Math.PI) / 180);
        } else {
            return new Angle(AngleType.Radians, this.value);
        }
    }
}
