import { Message } from "../message";
import { WebSocketConnection } from "./websocket-connection";
import { WebSocketRouteHandler } from "./websocket-route-handler";

export class MessageRouter {
    private routingPath: Map<String, WebSocketRouteHandler>;

    constructor() {
        this.routingPath = new Map<String, WebSocketRouteHandler>();
    }

    addRoute(path: string, routeHandler: WebSocketRouteHandler) {
        this.routingPath.set(path, routeHandler);
    }

    route(path: string, message: Message, connection: WebSocketConnection) {
        if (this.routingPath.has(path)) {
            this.routingPath.get(path)!(message, connection);
        } else {
            console.log(`No route ${path}`);
        }
    }
}
