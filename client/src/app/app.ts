import { Canvas } from "../canvas/canvas";
import { Event } from "../events/event";
import { EventType } from "../events/event-type";
import { MessageEvent } from "../events/message-event";
import { Game } from "../game/game";
import { Message } from "../messages/message";
import { MessageRouter } from "../routes/message-router";
import { ToastManager } from "../toast/toast-manager";
import { AppConfiguration } from "./app-configuration";
import { Connection } from "./connection";

export class App {
    public readonly canvas: Canvas;
    public readonly toastManager: ToastManager;
    public readonly connection: Connection;
    public readonly game: Game;
    private router: MessageRouter;

    constructor(private configuration: AppConfiguration) {
        this.canvas = new Canvas(configuration.canvasElement);
        this.toastManager = new ToastManager(configuration.toastElement);
        this.connection = new Connection(configuration.connectionURL);
        this.router = new MessageRouter();
        this.game = new Game(this.canvas);

        this.connection.onOpen(() => {
            this.game.start();
        });

        this.configureRoutes();
    }

    private configureRoutes() {
        this.configuration.routes.forEach((RouteConstructor) => {
            this.router.addRoute(new RouteConstructor(this));
        });
        this.connection.onMessage((message: Message) => {
            this.router.route(message);
        });
        this.game.on(EventType.Message, (event: Event) => {
            event.assertEventType(EventType.Message);
            const messageEvent = event as MessageEvent;
            this.router.route(messageEvent.message);
        });
    }

    listen() {}
}
