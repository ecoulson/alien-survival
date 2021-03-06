import { Vector2D } from "../../game/game-objects/vector2d";
import { PlayerJoinedEvent } from "../../game/events/player-joined.event";
import { Game } from "../../game/game";
import { Player } from "../../game/player/player";
import { Message } from "../../message";
import { Connection } from "../connection";
import { ConnectedMessageData } from "../messages/connected-message";
import { WebSocketServer } from "../websocket-server";
import { Route } from "./route";
import { RouteHandler } from "./route-handler";
import { Transform } from "../../game/game-objects/transform";

export class ConnectedRoute extends Route {
    constructor(game: Game, server: WebSocketServer) {
        super(game, server);
        this.handleConnection = this.handleConnection.bind(this);
    }

    handleConnection(
        message: Message<ConnectedMessageData>,
        connection: Connection
    ) {
        this.game.emit(
            new PlayerJoinedEvent(
                new Player({
                    name: message.data.username,
                    connectionId: connection.id(),
                    transform: Transform.zero
                }),
                connection
            )
        );
    }

    getAllRoutes() {
        return new Map<string, RouteHandler>([
            ["/connected", this.handleConnection]
        ]);
    }
}
