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
}
