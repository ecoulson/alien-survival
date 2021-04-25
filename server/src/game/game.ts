import { ConnectionManager } from "../websocket/connection-manager";
import { GameMap } from "./game-map";
import { Player } from "./player";

export class Game {
    private players: Player[];
    private map: GameMap;

    constructor() {
        this.players = [];
        this.map = new GameMap();
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }

    lookUpPlayer(id: string) {
        const player = this.players.find(
            (otherPlayer) => otherPlayer.id.value() === id
        );
        if (!player) {
            throw new Error(`No player with playerId ${id}`);
        }
        return player;
    }

    removePlayer(id: string) {
        const index = this.players.findIndex(
            (otherPlayer) => otherPlayer.id.value() === id
        );
        if (index === -1) {
            throw new Error(`No player with playerId ${id}`);
        }
        this.players.splice(index, 1);
    }
}
