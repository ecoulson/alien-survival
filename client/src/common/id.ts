import { v4 as generateId } from "uuid";

export class Id {
    private id: string;

    constructor(id?: string) {
        if (!id) {
            this.id = generateId();
        } else {
            this.id = id;
        }
    }

    public get value(): string {
        return this.id;
    }

    public equals(otherId: Id) {
        return this.id === otherId.id;
    }
}
