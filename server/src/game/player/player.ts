import { Entity } from "../../common/entity";
import { isEmptyString } from "../../common/util/is-empty";
import { Vector2D } from "../game-objects/vector2d";
import { PlayerProps } from "./player.props";

export class Player extends Entity<PlayerProps> {
    constructor(props: PlayerProps) {
        super(props);
    }

    public get name(): string {
        return this.props.name;
    }

    public get position(): Vector2D {
        return this.props.transform.position;
    }

    moveTo(point: Vector2D) {
        this.props.transform.position = point;
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
            transform: this.props.transform.serialize()
        };
    }
}
