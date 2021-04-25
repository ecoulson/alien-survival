import { v4 as id } from "uuid";

export class ConnectionId {
    private id: string;

    constructor() {
        this.id = id();
    }

    get value() {
        return this.id;
    }
}
