import { Event } from "../events/event";
import { EventEmitter } from "../events/event-emitter";
import { EventListener } from "../events/event-listener";
import { EventType } from "../events/event-type";
import { GameMap } from "./game-map";
import { PlayerManager } from "./player/player-manager";

export class Game {
    private playerManager: PlayerManager;
    private map: GameMap;
    private eventEmitter: EventEmitter;

    constructor() {
        this.map = new GameMap();
        this.eventEmitter = new EventEmitter();
        this.playerManager = new PlayerManager(this.eventEmitter);
    }

    emit(event: Event) {
        this.eventEmitter.emit(event);
    }

    on(eventType: EventType, eventListener: EventListener) {
        this.eventEmitter.on(eventType, eventListener);
    }
}
