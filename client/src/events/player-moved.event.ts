import { PlayerMovedMessage } from "../messages/message";
import { Event } from "./event";
import { EventType } from "./event-type";

export class PlayerMovedEvent extends Event {
    constructor(public message: PlayerMovedMessage) {
        super(EventType.PlayerMoved);
    }
}
