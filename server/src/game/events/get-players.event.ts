import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";

export class GetPlayersEvent extends Event {
    constructor() {
        super(EventType.GetPlayers);
    }
}
