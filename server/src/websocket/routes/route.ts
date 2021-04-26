import { isNil } from "../../common/util/is-nil";
import { Game } from "../../game/game";
import { Server } from "../../server";
import { RouteHandler } from "./route-handler";

export abstract class Route {
    constructor(protected game: Game, protected server: Server) {
        if (isNil(game)) {
            throw new Error("Cannot create a route for a nil game");
        }
        if (isNil(server)) {
            throw new Error("Cannot create a route for a nil server");
        }
    }

    abstract getAllRoutes(): Map<String, RouteHandler>;
}
