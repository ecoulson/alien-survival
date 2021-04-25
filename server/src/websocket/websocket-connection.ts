import WebSocket from "ws";
import { Connection } from "./connection";
import { ConnectionId } from "./connection-id";
import { WebSocketServer } from "./websocket-server";

export class WebSocketConnection implements Connection {
    private id: ConnectionId;

    constructor(private server: WebSocketServer, socket: WebSocket) {
        this.id = new ConnectionId();
        socket.on("message", this.handleMessage.bind(this));
        socket.on("close", this.handleClose.bind(this));
        socket.on("error", this.handleError.bind(this));
    }

    public connectionId() {
        return this.id;
    }

    private handleError() {}

    private handleClose() {}

    private handleMessage(data: string) {
        const message = JSON.parse(data);
        if (this.server && message.path && message.data) {
            this.server.route(message, this);
        }
    }
}
