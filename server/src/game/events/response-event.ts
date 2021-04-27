import { Id } from "../../common/id";
import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Message } from "../../message";

export class ResponseEvent extends Event {
    constructor(
        public readonly connectionId: Id,
        public readonly message: Message
    ) {
        super(EventType.Response);
    }
}
