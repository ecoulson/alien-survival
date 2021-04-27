import { Entity } from "../../common/entity";
import { isEmptyString } from "../../common/util/is-empty";
import { Point } from "../domain/point";
import { PlayerProps } from "./player.props";

export class Player extends Entity<PlayerProps> {
    constructor(props: PlayerProps) {
        super(props);
    }

    public get name(): string {
        return this.props.name;
    }

    public get position(): Point {
        return this.props.position;
    }

    moveTo(point: Point) {
        this.props.position = point;
    }

    validate() {
        if (isEmptyString(this.props.name)) {
            throw new Error("Player must have a non empty name");
        }
    }

    serialize() {
        return {
            id: this.id().value,
            connectionId: this.props.connectionId.serialize(),
            name: this.props.name,
            position: this.props.position.serialize()
        };
    }
}
