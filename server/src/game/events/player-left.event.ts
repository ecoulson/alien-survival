import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Connection } from "../../websocket/connection";

export class PlayerLeftEvent extends Event {
    constructor(public readonly connection: Connection) {
        super(EventType.PlayerLeft);
    }
}
