import { Serializable } from "../../common/serializable";

interface PointProps {
    x: number;
    y: number;
}

export class Point implements Serializable {
    constructor(private props: PointProps) {}

    public get x(): number {
        return this.props.x;
    }

    public get y(): number {
        return this.props.y;
    }

    serialize() {
        return {
            x: this.props.x,
            y: this.props.y
        };
    }
}
