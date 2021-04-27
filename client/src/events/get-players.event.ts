import { GetPlayersMessage } from "../messages/message";
import { Event } from "./event";
import { EventType } from "./event-type";

export class GetPlayersEvent extends Event {
    constructor(public readonly message: GetPlayersMessage) {
        super(EventType.GetPlayers);
    }
}
