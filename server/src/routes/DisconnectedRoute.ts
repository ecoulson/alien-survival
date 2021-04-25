import { Game } from "../game/game";
import { Message } from "../message";
import { WebSocketServer } from "../websocket/websocket-server";

interface DisconnectedMessage {
    playerId: string;
}

export class DisconnectedRoute {
    constructor(private game: Game, private server: WebSocketServer) {
        this.handleConnectionClose = this.handleConnectionClose.bind(this);
    }

    handleConnectionClose(message: Message<DisconnectedMessage>) {
        console.log(message);
        console.log(`${message.data.playerId} has disconnected to the server`);
        this.server.broadcast({
            path: "/disconnected",
            data: {
                player: this.game.lookUpPlayer(message.data.playerId)
            }
        });
        this.game.removePlayer(message.data.playerId);
    }
}
