import { v4 } from "uuid";
import { Equatable } from "./equatable";
import { Serializable } from "./serializable";

export class Id implements Equatable<Id>, Serializable {
    private id: string;

    constructor(id?: string) {
        if (!id) {
            this.id = v4();
        } else {
            this.id = id;
        }
    }

    public get value(): string {
        return this.id;
    }

    equals(otherId: Id) {
        return otherId.id === this.id;
    }

    serialize() {
        return this.id;
    }
}
