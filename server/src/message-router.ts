import { Message } from "./message";
import { WebSocketRouteHandler } from "./websocket-route-handler";
import { WebSocketServer } from "./websocket-server";

export class MessageRouter {
    private routingPath: Map<String, WebSocketRouteHandler>;

    constructor() {
        this.routingPath = new Map<String, WebSocketRouteHandler>();
    }

    addRoute(path: string, routeHandler: WebSocketRouteHandler) {
        this.routingPath.set(path, routeHandler);
    }

    route(path: string, message: Message, server: WebSocketServer) {
        if (this.routingPath.has(path)) {
            this.routingPath.get(path)!(message, server);
        } else {
            console.log(`No route ${path}`);
        }
    }
}
