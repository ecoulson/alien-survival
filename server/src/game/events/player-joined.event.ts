import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Connection } from "../../websocket/connection";
import { Player } from "../player/player";

export class PlayerJoinedEvent extends Event {
    constructor(
        public readonly player: Player,
        public readonly connection: Connection
    ) {
        super(EventType.PlayerJoined);
    }
}
