import { Game } from "../game/game";
import { Player } from "../game/player";
import { Message } from "../message";
import { WebSocketServer } from "../websocket-server";

interface ConnectedMessageData {
    username: string;
}

export class ConnectedRoutes {
    constructor(private game: Game) {
        this.handleConnection = this.handleConnection.bind(this);
    }

    handleConnection(
        message: Message<ConnectedMessageData>,
        server: WebSocketServer
    ) {
        console.log(`${message.data.username} has connected to the server`);
        this.game.addPlayer(new Player(message.data.username));
        server.broadcast(message);
    }
}
