import { Connection } from "../../app/connection";
import { Id } from "../../common/id";
import { Event } from "../../events/event";
import { EventType } from "../../events/event-type";
import { GetPlayersEvent } from "../../events/get-players.event";
import { MessageEvent } from "../../events/message-event";
import { PlayerJoinedEvent } from "../../events/player-joined.event";
import { PlayerMovedEvent } from "../../events/player-moved.event";
import { SerializedPlayer } from "../../messages/serialized-player";
import { GameObject } from "../game-objects/game-object";
import { Vector2D } from "../game-objects/vector2d";
import { Mouse } from "../input/mouse";
import { Scene } from "../scenes/scene";
import { EmptySprite } from "../sprites/empty-sprite";
import { PlayerSprite } from "./player-sprite";
import { Player } from "./player";
import { PlayerController } from "./player-controller";
import { Keyboard } from "../input/keyboard";

export class PlayerManager extends GameObject {
    private players: Player[];

    constructor(scene: Scene, private mouse: Mouse, private keyboard: Keyboard) {
        super(scene, new EmptySprite());
        this.players = [];

        this.scene.on(EventType.PlayerJoined, this.playerJoined.bind(this));
        this.scene.on(EventType.GetPlayers, this.addAllPlayers.bind(this));
        this.scene.on(EventType.PlayerMoved, this.onPlayerMoved.bind(this));
        this.scene.emit(
            new MessageEvent({
                path: "/get-players",
                data: null
            })
        );
    }

    onPlayerMoved(event: Event) {
        event.assertEventType(EventType.PlayerMoved);
        const movedEvent = event as PlayerMovedEvent;
        if (
            !this.isPlayerOnCurrentConnection(new Id(movedEvent.message.data.player.connectionId))
        ) {
            const player = this.findPlayerById(new Id(movedEvent.message.data.player.id));
            player.moveTo(
                new Vector2D(
                    movedEvent.message.data.player.transform.position.x,
                    movedEvent.message.data.player.transform.position.y
                )
            );
        }
    }

    private findPlayerById(playerId: Id) {
        const player = this.players.find((otherPlayer) => otherPlayer.entityId().equals(playerId));
        if (!player) {
            throw new Error(`No player with entity id ${playerId.value}`);
        }
        return player;
    }

    addAllPlayers(event: Event) {
        event.assertEventType(EventType.GetPlayers);
        const getPlayersEvent = event as GetPlayersEvent;
        getPlayersEvent.message.data.players.forEach((serializedPlayer) => {
            const player = this.createPlayerFromSerializedData(serializedPlayer);
            player.moveTo(
                new Vector2D(
                    serializedPlayer.transform.position.x,
                    serializedPlayer.transform.position.y
                )
            );
            this.players.push(player);
            this.scene.addObjectToScene(player);
        });
    }

    playerJoined(event: Event) {
        event.assertEventType(EventType.PlayerJoined);
        const joinEvent = event as PlayerJoinedEvent;
        const newPlayer = this.createPlayerFromSerializedData(joinEvent.message.data.player);
        this.players.push(newPlayer);
        this.scene.addObjectToScene(newPlayer);
        if (this.isPlayerOnCurrentConnection(new Id(joinEvent.message.data.player.connectionId))) {
            this.scene.addObjectToScene(
                new PlayerController(this.scene, newPlayer, this.mouse, this.keyboard)
            );
        }
    }

    private createPlayerFromSerializedData(serializedPlayer: SerializedPlayer) {
        return new Player(
            this.scene,
            new PlayerSprite(),
            serializedPlayer.name,
            new Id(serializedPlayer.id)
        );
    }

    private isPlayerOnCurrentConnection(connectionId: Id) {
        if (!Connection.CONNECTION_ID) {
            return false;
        } else {
            return connectionId.equals(Connection.CONNECTION_ID);
        }
    }

    update(): void {}
}
