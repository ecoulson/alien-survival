import { AppConfiguration } from "./app-configuration";
import { Game } from "./game/game";
import { MessageRouter } from "./websocket/message-router";
import { WebSocketRouteHandler } from "./websocket/websocket-route-handler";
import { WebSocketServer } from "./websocket/websocket-server";

export default class App {
    public readonly server: WebSocketServer;
    public readonly messageRouter: MessageRouter;
    public readonly game: Game;

    constructor(private appConfiguration: AppConfiguration) {
        this.messageRouter = new MessageRouter();
        this.server = new WebSocketServer(this.messageRouter);
        this.game = new Game();
    }

    start() {
        this.server.listen(this.appConfiguration.websocketPort);
    }

    addRoute(path: string, handler: WebSocketRouteHandler) {
        this.messageRouter.addRoute(path, handler);
    }
}
