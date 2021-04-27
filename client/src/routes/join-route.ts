import { Connection } from "../app/connection";
import { Id } from "../common/id";
import { PlayerJoinedEvent } from "../events/player-joined.event";
import { PlayerJoinedMessage, WhoAMIMessage } from "../messages/message";
import { Route } from "./route";
import { RouteListener } from "./route-listener";

export class JoinRoute extends Route {
    private whoami(message: WhoAMIMessage) {
        console.log(message.data);
        Connection.CONNECTION_ID = new Id(message.data);
    }

    private handleJoin(message: PlayerJoinedMessage) {
        this.app.toastManager.toast(`${message.data.player.name} has joined the game!`, {
            duration: 10000
        });
        this.app.game.emit(new PlayerJoinedEvent(message));
    }

    getRoutes(): Map<string, RouteListener> {
        return new Map<string, RouteListener>([
            ["/joined", this.handleJoin.bind(this)],
            ["/whoami", this.whoami.bind(this)]
        ]);
    }
}
