import { Id } from "../../common/id";
import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Vector2D } from "../game-objects/vector2d";

export class PlayerMoveEvent extends Event {
    constructor(public readonly playerId: Id, public readonly position: Vector2D) {
        super(EventType.MovePlayer);
    }
}
