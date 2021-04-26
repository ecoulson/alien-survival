import { Message } from "../message";
import { RouteHandler } from "./routes/route-handler";
import { Route } from "./routes/route";
import { Connection } from "./connection";

export class MessageRouter {
    private routingPath: Map<String, RouteHandler>;

    constructor() {
        this.routingPath = new Map<String, RouteHandler>();
    }

    addRoute(route: Route) {
        route.getAllRoutes().forEach((routeHandler, path) => {
            this.routingPath.set(path, routeHandler);
        });
    }

    route(path: string, message: Message, connection: Connection) {
        if (this.routingPath.has(path)) {
            this.routingPath.get(path)!(message, connection);
        } else {
            throw new Error(`No route ${path}`);
        }
    }
}
