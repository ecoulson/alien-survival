import { PlayerJoinedMessage } from "../messages/message";
import { Event } from "./event";
import { EventType } from "./event-type";

export class PlayerJoinedEvent extends Event {
    constructor(public message: PlayerJoinedMessage) {
        super(EventType.PlayerJoined);
    }
}
