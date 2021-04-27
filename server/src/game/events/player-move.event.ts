import { Id } from "../../common/id";
import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { Point } from "../domain/point";

export class PlayerMoveEvent extends Event {
    constructor(public readonly playerId: Id, public readonly position: Point) {
        super(EventType.MovePlayer);
    }
}
