import { Id } from "../../common/id";
import { Event } from "../../events/event";
import { EventEmitter } from "../../events/event-emitter";
import { EventType } from "../../events/event-type";
import { BroadcastEvent } from "../events/broadcast-event";
import { PlayerJoinedEvent } from "../events/player-joined.event";
import { PlayerLeftEvent } from "../events/player-left.event";
import { PlayerMoveEvent } from "../events/player-move.event";
import { Game } from "../game";
import { ConnectionMap } from "./connection-map";
import { Player } from "./player";

export class PlayerManager {
    private connectionMap: ConnectionMap;
    private players: Player[];

    constructor(private game: Game) {
        this.players = [];
        this.connectionMap = new ConnectionMap();

        this.playerJoined = this.playerJoined.bind(this);
        this.playerLeft = this.playerLeft.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.movePlayer = this.movePlayer.bind(this);

        this.game.on(EventType.PlayerJoined, this.playerJoined);
        this.game.on(EventType.PlayerLeft, this.playerLeft);
        this.game.on(EventType.GetPlayers, this.getPlayers);
        this.game.on(EventType.MovePlayer, this.movePlayer);
    }

    getPlayers() {
        return this.players;
    }

    movePlayer(event: Event) {
        event.assertEventType(EventType.MovePlayer);
        let { playerId, position }: PlayerMoveEvent = event as PlayerMoveEvent;
        const player = this.findPlayerById(playerId);
        player.moveTo(position);
        this.game.emit(
            new BroadcastEvent({
                path: "/player-moved",
                data: { player: player.serialize() }
            })
        );
    }

    private findPlayerById(playerId: Id) {
        const player = this.players.find((otherPlayer) =>
            otherPlayer.id().equals(playerId)
        );
        if (!player) {
            throw new Error(`No player with id ${playerId.value} in game`);
        }
        return player;
    }

    private playerJoined(event: Event): void {
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
        this.game.emit(
            new BroadcastEvent({
                path: "/joined",
                data: { player: player.serialize() }
            })
        );
    }

    private playerIsConnected(player: Player) {
        return (
            this.players.find((otherPlayer) => otherPlayer.equals(player)) !==
            undefined
        );
    }

    private playerLeft(event: Event): void {
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
        this.game.emit(
            new BroadcastEvent({
                path: "/left",
                data: { player: player.serialize() }
            })
        );
    }

    private removePlayer(player: Player) {
        return this.players.filter((otherPlayer) => otherPlayer.equals(player));
    }
}
