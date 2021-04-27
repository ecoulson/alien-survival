import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Message } from "../../message";

export class BroadcastEvent extends Event {
    constructor(public readonly message: Message) {
        super(EventType.Broadcast);
    }
}
