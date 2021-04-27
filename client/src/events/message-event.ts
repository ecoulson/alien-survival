import { Message } from "../messages/message";
import { Event } from "./event";
import { EventType } from "./event-type";

export class MessageEvent extends Event {
    constructor(public message: Message) {
        super(EventType.Message);
    }
}
