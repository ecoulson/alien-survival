import { Id } from "../common/id";
import { Identifiable } from "../common/identifiable";

import { EventType } from "./event-type";

export class Event implements Identifiable {
    constructor(public readonly type: EventType) {}

    id(): Id {
        return this.id();
    }

    assertEventType(assertedType: EventType) {
        if (this.type !== assertedType) {
            throw new Error(
                `Event has mismatching types. Event is of type ${this.type} when asserting it is ${assertedType}`
            );
        }
    }
}
