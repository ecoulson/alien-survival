import { AppConfiguration } from "./app-configuration";
import { Event } from "./events/event";
import { EventType } from "./events/event-type";
import { PlayerLeftEvent } from "./game/events/player-left.event";
import { Game } from "./game/game";
import { Server } from "./server";
import { SocketDisconnectionEvent } from "./websocket/events/socket-disconnection.event";
import { MessageRouter } from "./websocket/message-router";
import { WebSocketServer } from "./websocket/websocket-server";

export default class App {
    public readonly server: Server;
    public readonly game: Game;
    private messageRouter: MessageRouter;

    constructor(private appConfiguration: AppConfiguration) {
        this.messageRouter = new MessageRouter();
        this.server = new WebSocketServer(this.messageRouter);
        this.game = new Game();

        this.configureRoutes();
    }

    private configureRoutes() {
        this.appConfiguration.routes.forEach((RouteConstructor) => {
            this.messageRouter.addRoute(
                new RouteConstructor(this.game, this.server)
            );
        });
    }

    start() {
        this.server.listen(this.appConfiguration.websocketPort);
        this.server.onDisconnection((event: Event) => {
            event.assertEventType(EventType.SocketDisconnected);
            const socketDisconnectedEvent = event as SocketDisconnectionEvent;
            this.game.emit(
                new PlayerLeftEvent(socketDisconnectedEvent.connection)
            );
        });
    }
}
