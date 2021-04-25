import WebSocket from "ws";
import { Message } from "../message";
import { MessageRouter } from "./message-router";
import { WebSocketConnection } from "./websocket-connection";

export class WebSocketServer {
    private server: WebSocket.Server | null;

    constructor(private router: MessageRouter) {
        this.server = null;
    }

    listen(port: number) {
        this.server = new WebSocket.Server({ port });
        this.handleConnection();
    }

    broadcast(message: Message) {
        this.assertServerStarted();
        this.server!.clients.forEach((client) => {
            client.send(JSON.stringify(message));
        });
    }

    route(message: Message, connection: WebSocketConnection) {
        this.router.route(message.path, message, connection);
    }

    private assertServerStarted() {
        if (!this.server) {
            throw new Error("WebSocket Server has not been initialized");
        }
    }

    private handleConnection() {
        this.assertServerStarted();
        this.server!.on(
            "connection",
            (socket: WebSocket) => new WebSocketConnection(this, socket)
        );
    }
}
