import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Connection } from "../connection";

export class SocketConnectionEvent extends Event {
    constructor(public readonly connection: Connection) {
        super(EventType.SocketConnection);
    }
}
