import { AppConfiguration } from "./app-configuration";
import { MessageRouter } from "./message-router";
import { WebSocketRouteHandler } from "./websocket-route-handler";
import { WebSocketServer } from "./websocket-server";

export default class App {
    private server: WebSocketServer;
    private messageRouter: MessageRouter;

    constructor(private appConfiguration: AppConfiguration) {
        this.messageRouter = new MessageRouter();
        this.server = new WebSocketServer(this.messageRouter);
    }

    start() {
        this.server.listen(this.appConfiguration.websocketPort);
    }

    addRoute(path: string, handler: WebSocketRouteHandler) {
        this.messageRouter.addRoute(path, handler);
    }
}
