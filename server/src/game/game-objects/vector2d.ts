import { Serializable } from "../../common/serializable";

interface Vector2DProps {
    x: number;
    y: number;
}

export class Vector2D implements Serializable {
    constructor(private props: Vector2DProps) {}

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
