import WebSocket from "ws";
import { Id } from "../common/id";
import { isNil } from "../common/util/is-nil";
import { EventEmitter } from "../events/event-emitter";
import { Connection } from "./connection";
import { SocketDisconnectionEvent } from "./events/socket-disconnection.event";
import { WebSocketServer } from "./websocket-server";

export class WebSocketConnection implements Connection {
    private connectionId: Id;

    constructor(
        private server: WebSocketServer,
        socket: WebSocket,
        private eventEmitter: EventEmitter
    ) {
        this.validateConnection(server, socket, eventEmitter);
        this.connectionId = new Id();
        socket.on("message", this.handleMessage.bind(this));
        socket.on("close", this.handleClose.bind(this));
        socket.on("error", this.handleError.bind(this));
    }

    private validateConnection(
        server: WebSocketServer,
        socket: WebSocket,
        eventEmitter: EventEmitter
    ) {
        if (isNil(server)) {
            throw new Error("Cannot create a connection to a nil server");
        }
        if (isNil(socket)) {
            throw new Error("Cannot create a connection for a nil connection");
        }
        if (isNil(eventEmitter)) {
            throw new Error("Event emitter can not be nil");
        }
    }

    public id() {
        return this.connectionId;
    }

    private handleError() {
        console.log(
            `An error occured with connection ${this.connectionId.value}`
        );
    }

    private handleClose() {
        console.log(`Connection ${this.connectionId.value} has disconnected`);
        this.eventEmitter.emit(new SocketDisconnectionEvent(this));
    }

    private handleMessage(data: string) {
        try {
            const message = JSON.parse(data);
            if (this.server && message.path && message.data) {
                this.server.route(message, this);
            } else if (!this.server) {
                throw new Error(
                    "Cannot handle messages before the server is listening"
                );
            } else if (!message) {
                throw new Error("Could not parse null message");
            } else if (!message.path) {
                throw new Error("Can not route messages with out a path");
            } else if (!message.data) {
                throw new Error("All messages must have a data field");
            }
        } catch {
            throw new Error(
                `Message from connection ${this.connectionId.value} did not contain valid json data (Contents on the following lines).\n${data}`
            );
        }
    }
}
