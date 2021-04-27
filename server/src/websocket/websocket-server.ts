import WebSocket from "ws";
import { Message } from "../message";
import { MessageRouter } from "./message-router";
import { Server } from "../server";
import { WebSocketConnection } from "./websocket-connection";
import { EventEmitter } from "../events/event-emitter";
import { EventListener } from "../events/event-listener";
import { EventType } from "../events/event-type";
import { SocketConnectionEvent } from "./events/socket-connection.event";
import { deepClone } from "../common/util/deep-clone";
import { Id } from "../common/id";

export class WebSocketServer implements Server {
    private server: WebSocket.Server | null;
    private eventEmitter: EventEmitter;
    private connections: WebSocketConnection[];

    constructor(private router: MessageRouter) {
        this.server = null;
        this.eventEmitter = new EventEmitter();
        this.connections = [];
    }

    listen(port: number) {
        this.server = new WebSocket.Server({ port });
        this.setupConnections();
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

    onConnection(listener: EventListener) {
        this.eventEmitter.on(EventType.SocketConnection, listener);
    }

    onDisconnection(listener: EventListener) {
        this.eventEmitter.on(EventType.SocketDisconnected, listener);
    }

    getConnections() {
        return deepClone(this.connections);
    }

    getConnection(connectionId: Id) {
        const connection = this.connections.find((otherConnection) =>
            otherConnection.id().equals(connectionId)
        );
        if (!connection) {
            throw new Error(
                `No connection with connection id ${connectionId.value}`
            );
        }
        return connection;
    }

    private assertServerStarted() {
        if (!this.server) {
            throw new Error("WebSocket Server has not been initialized");
        }
    }

    private setupConnections() {
        this.assertServerStarted();
        this.server!.on("connection", (socket: WebSocket) => {
            console.log("Handling new socket connected");
            const connection = new WebSocketConnection(
                this,
                socket,
                this.eventEmitter
            );
            this.connections.push(connection);
            this.eventEmitter.emit(new SocketConnectionEvent(connection));
        });
    }
}
