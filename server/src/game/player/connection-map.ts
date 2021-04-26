import { isNil } from "../../common/util/is-nil";
import { Connection } from "../../websocket/connection";
import { Player } from "./player";

export class ConnectionMap {
    private map: Map<string, Player>;

    constructor() {
        this.map = new Map<string, Player>();
    }

    mapPlayerToConnection(connection: Connection, player: Player) {
        this.assertValidConnection(connection);
        this.assertValidPlayer(player);
        const id = connection.id().value;
        if (this.map.has(id)) {
            throw new Error(
                `Connection with id ${id} is already mapped to a player`
            );
        }
        this.map.set(id, player);
    }

    private assertValidConnection(connection: Connection) {
        if (isNil(connection)) {
            throw new Error("Connection must not be nil for a mapping");
        }
    }

    private assertValidPlayer(player: Player) {
        if (isNil(player)) {
            throw new Error(
                "Can not create a connection mapping to a nil player"
            );
        }
    }

    getPlayerFromConnection(connection: Connection) {
        this.assertValidConnection(connection);
        const id = connection.id().value;
        if (!this.map.has(id)) {
            throw new Error(
                `Can look up user from connection ${id} because it has no mapping`
            );
        } else {
            return this.map.get(id);
        }
    }

    removeConnectionMapping(connection: Connection) {
        this.assertValidConnection(connection);
        const id = connection.id().value;
        if (!this.map.has(id)) {
            throw new Error(
                `Can not remove a mapping from connection ${id} because it has no mapping`
            );
        } else {
            return this.map.delete(id);
        }
    }
}
