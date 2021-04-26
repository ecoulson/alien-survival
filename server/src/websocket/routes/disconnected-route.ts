import { Game } from "../../game/game";
import { Message } from "../../message";
import { WebSocketServer } from "../websocket-server";
import { Route } from "./route";
import { RouteHandler } from "./route-handler";

interface DisconnectedMessage {
    playerId: string;
}

export class DisconnectedRoute extends Route {
    constructor(game: Game, server: WebSocketServer) {
        super(game, server);
        this.handleConnectionClose = this.handleConnectionClose.bind(this);
    }

    handleConnectionClose(message: Message<DisconnectedMessage>) {
        console.log(message);
        console.log(`${message.data.playerId} has disconnected to the server`);
    }

    getAllRoutes() {
        return new Map<string, RouteHandler>([
            ["/disconnected", this.handleConnectionClose]
        ]);
    }
}
