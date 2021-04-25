import { ConnectionId } from "./connection-id";

export interface Connection {
    connectionId(): ConnectionId;
}
