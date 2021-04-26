import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Connection } from "../connection";

export class SocketDisconnectionEvent extends Event {
    constructor(public readonly connection: Connection) {
        super(EventType.SocketDisconnected);
    }
}
