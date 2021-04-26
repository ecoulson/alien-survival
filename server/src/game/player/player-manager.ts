import { Event } from "../../events/event";
import { EventEmitter } from "../../events/event-emitter";
import { EventType } from "../../events/event-type";
import { PlayerJoinedEvent } from "../events/player-joined.event";
import { PlayerLeftEvent } from "../events/player-left.event";
import { ConnectionMap } from "./connection-map";
import { Player } from "./player";

export class PlayerManager {
    private connectionMap: ConnectionMap;
    private players: Player[];

    constructor(private eventEmitter: EventEmitter) {
        this.players = [];
        this.connectionMap = new ConnectionMap();

        this.playerJoined = this.playerJoined.bind(this);
        this.playerLeft = this.playerLeft.bind(this);
        this.eventEmitter.on(EventType.PlayerJoined, this.playerJoined);
        this.eventEmitter.on(EventType.PlayerLeft, this.playerLeft);
    }

    playerJoined(event: Event): void {
        event.assertEventType(EventType.PlayerJoined);
        let {
            player,
            connection
        }: PlayerJoinedEvent = event as PlayerJoinedEvent;
        if (this.playerIsConnected(player)) {
            throw new Error(
                `Player with id ${player.id().value} is already connected`
            );
        }
        console.log(`${player.name} has connected to the server`);
        this.connectionMap.mapPlayerToConnection(connection, player);
        this.players.push(player);
    }

    private playerIsConnected(player: Player) {
        return (
            this.players.find((otherPlayer) => otherPlayer.equals(player)) !==
            undefined
        );
    }

    playerLeft(event: Event): void {
        event.assertEventType(EventType.PlayerLeft);
        let { connection }: PlayerLeftEvent = event as PlayerLeftEvent;
        const player = this.connectionMap.getPlayerFromConnection(connection)!;
        if (!this.playerIsConnected(player)) {
            throw new Error(
                `Player with id ${player.id().value} is not connected`
            );
        }
        console.log(`${player.name} has left the server`);
        this.players = this.removePlayer(player);
        this.connectionMap.removeConnectionMapping(connection);
    }

    private removePlayer(player: Player) {
        return this.players.filter((otherPlayer) => otherPlayer.equals(player));
    }
}
