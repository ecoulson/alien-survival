import { Message } from "../message";
import { WebSocketConnection } from "./websocket-connection";

export type WebSocketRouteHandler = (
    message: Message,
    connection: WebSocketConnection
) => void;
