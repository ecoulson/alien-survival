import { Entity } from "../../common/entity";
import { isEmptyString } from "../../common/util/is-empty";
import { PlayerProps } from "./player.props";

export class Player extends Entity<PlayerProps> {
    constructor(props: PlayerProps) {
        super(props);
    }

    public get name(): string {
        return this.props.name;
    }

    validate() {
        if (isEmptyString(this.props.name)) {
            throw new Error("Player must have a non empty name");
        }
    }
}
