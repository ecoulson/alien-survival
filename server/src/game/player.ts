import { EntityId } from "./entity-id";

export class Player {
    public readonly id: EntityId;
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
        this.id = new EntityId();
    }
}
