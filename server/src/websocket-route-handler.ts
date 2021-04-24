import { Message } from "./message";
import { WebSocketServer } from "./websocket-server";

export type WebSocketRouteHandler = (
    message: Message,
    server: WebSocketServer
) => void;
