import { Game } from "../game/game";
import { Player } from "../game/player";
import { Message } from "../message";
import { WebSocketServer } from "../websocket/websocket-server";

interface ConnectedMessageData {
    username: string;
}

export class ConnectedRoutes {
    constructor(private game: Game, private server: WebSocketServer) {
        this.handleConnection = this.handleConnection.bind(this);
    }

    handleConnection(message: Message<ConnectedMessageData>) {
        console.log(`${message.data.username} has connected to the server`);
        const player = new Player(message.data.username);
        this.game.addPlayer(player);
        this.server.broadcast({
            path: "/connected",
            data: {
                player
            }
        });
    }
}
