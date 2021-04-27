import { App } from "../app/app";
import { GetPlayersEvent } from "../events/get-players.event";
import { PlayerMovedEvent } from "../events/player-moved.event";
import { Message } from "../messages/message";
import { Route } from "./route";
import { RouteListener } from "./route-listener";

export class PlayerRoute extends Route {
    constructor(app: App) {
        super(app);
        this.getAllPlayers = this.getAllPlayers.bind(this);
        this.getAllPlayersResponse = this.getAllPlayersResponse.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
        this.playerMoved = this.playerMoved.bind(this);
    }

    getAllPlayers() {
        this.app.connection.send({
            path: "/get-players",
            data: {}
        });
    }

    getAllPlayersResponse(message: Message) {
        this.app.game.emit(new GetPlayersEvent(message));
    }

    movePlayer(message: Message) {
        this.app.connection.send(message);
    }

    playerMoved(message: Message) {
        this.app.game.emit(new PlayerMovedEvent(message));
    }

    getRoutes() {
        return new Map<string, RouteListener>([
            ["/get-players", this.getAllPlayers],
            ["/get-players-response", this.getAllPlayersResponse],
            ["/move-player", this.movePlayer],
            ["/player-moved", this.playerMoved]
        ]);
    }
}
