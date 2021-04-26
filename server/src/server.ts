import { EventListener } from "./events/event-listener";
import { Message } from "./message";
import { Connection } from "./websocket/connection";

export interface Server {
    listen(port: number): void;
    broadcast(message: Message): void;
    route(message: Message, connection: Connection): void;
    onConnection(listener: EventListener): void;
    onDisconnection(listener: EventListener): void;
}
