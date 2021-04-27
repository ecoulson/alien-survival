import { Message } from "../messages/message";
import { Route } from "./route";
import { RouteListener } from "./route-listener";

export class MessageRouter {
    private routingTable: Map<string, RouteListener>;

    constructor() {
        this.routingTable = new Map<string, RouteListener>();
    }

    addRoute(route: Route) {
        route.getRoutes().forEach((routeHandler, path) => {
            this.routingTable.set(path, routeHandler);
        });
    }

    route(message: Message) {
        if (!message.path) {
            throw new Error(
                "Cannot route invalid message. Messages must have a path"
            );
        }
        if (!this.routingTable.has(message.path)) {
            throw new Error(`No handler for message path ${message.path}`);
        }
        this.routingTable.get(message.path)!(message);
    }
}
