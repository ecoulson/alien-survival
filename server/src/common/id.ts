import { v4 } from "uuid";
import { Equatable } from "./equatable";

export class Id implements Equatable<Id> {
    private id: string;

    constructor() {
        this.id = v4();
    }

    public get value(): string {
        return this.id;
    }

    equals(otherId: Id) {
        return otherId.id === this.id;
    }
}
