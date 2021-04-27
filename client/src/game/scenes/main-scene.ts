import { Canvas } from "../../canvas/canvas";
import { Event } from "../../events/event";
import { EventHandler } from "../../events/event-handler";
import { EventType } from "../../events/event-type";
import { Game } from "../game";
import { GameObject } from "../game-objects/game-object";
import { PlayerManager } from "../player/player-manager";
import { Scene } from "./scene";

export class MainScene implements Scene {
    private objects: GameObject[];

    constructor(private game: Game) {
        this.objects = [];
    }

    init() {
        this.addObjectToScene(new PlayerManager(this, this.game.mouse));
    }

    addObjectToScene(obj: GameObject) {
        this.objects.push(obj);
    }

    getObjectsInScene() {
        return this.objects;
    }

    render(canvas: Canvas) {
        this.objects.forEach((obj) => obj.render(canvas));
    }

    update() {
        this.objects.forEach((obj) => obj.update());
    }

    on(eventType: EventType, handler: EventHandler) {
        this.game.on(eventType, handler);
    }

    emit(event: Event) {
        this.game.emit(event);
    }
}
