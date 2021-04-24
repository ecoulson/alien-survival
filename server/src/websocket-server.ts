import WebSocket from "ws";
import { Message } from "./message";
import { MessageRouter } from "./message-router";

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

    private assertServerStarted() {
        if (!this.server) {
            throw new Error("WebSocket Server has not been initialized");
        }
    }

    private handleConnection() {
        this.assertServerStarted();
        this.server!.on("connection", (connection: WebSocket) => {
            connection.on("message", this.handleMessage.bind(this));
        });
    }

    private handleMessage(data: string) {
        const message = JSON.parse(data);
        if (this.server && message.path && message.data) {
            this.router.route(message.path, message, this);
        }
    }
}
