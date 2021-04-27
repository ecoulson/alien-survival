import { Id } from "../../common/id";
import { Point } from "../../game/domain/point";
import { PlayerMoveEvent } from "../../game/events/player-move.event";
import { Game } from "../../game/game";
import { Message } from "../../message";
import { Connection } from "../connection";
import { MoveMessage } from "../messages/move-message";
import { WebSocketServer } from "../websocket-server";
import { Route } from "./route";
import { RouteHandler } from "./route-handler";

export class PlayerRoute extends Route {
    constructor(game: Game, server: WebSocketServer) {
        super(game, server);
        this.getAllPlayers = this.getAllPlayers.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
    }

    getAllPlayers(message: Message, connection: Connection) {
        connection.send({
            path: "/get-players-response",
            data: {
                players: this.game.getPlayers().map((x) => x.serialize())
            }
        });
    }

    movePlayer(message: Message<MoveMessage>) {
        this.game.emit(
            new PlayerMoveEvent(
                new Id(message.data.player.id),
                new Point(message.data.player.position)
            )
        );
    }

    getAllRoutes() {
        return new Map<string, RouteHandler>([
            ["/get-players", this.getAllPlayers],
            ["/move-player", this.movePlayer]
        ]);
    }
}
