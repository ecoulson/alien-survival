import { v4 as generate } from "uuid";

export class EntityId {
    private id: string;

    constructor() {
        this.id = generate();
    }

    public value() {
        return this.id;
    }
}
