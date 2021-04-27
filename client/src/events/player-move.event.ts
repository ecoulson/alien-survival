import { Player } from "../game/player/player";
import { MessageEvent } from "./message-event";

export class PlayerMoveEvent extends MessageEvent {
    constructor(public player: Player) {
        super({
            path: "/move-player",
            data: {
                player: player.serialize()
            }
        });
    }
}
