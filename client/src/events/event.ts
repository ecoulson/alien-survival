import { Id } from "../common/id";
import { EventType } from "./event-type";

export class Event {
    public readonly id: Id;

    constructor(public readonly type: EventType) {
        this.id = new Id();
    }

    assertEventType(assertedType: EventType) {
        if (this.type !== assertedType) {
            throw new Error(
                `Event has mismatching types. Event is of type ${this.type} when asserting it is ${assertedType}`
            );
        }
    }
}
