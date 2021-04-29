import { Canvas } from "../../canvas/canvas";
import { Event } from "../../events/event";
import { EventHandler } from "../../events/event-handler";
import { EventType } from "../../events/event-type";
import { GameObject } from "../game-objects/game-object";

export interface Scene {
    getObjectsInScene(): GameObject[];
    addObjectToScene(obj: GameObject): void;
    removeObjectFromScene(obj: GameObject): void;
    calculateCollisions(): void;
    render(canvas: Canvas): void;
    update(): void;
    init(): void;
    on(eventType: EventType, handler: EventHandler): void;
    emit(event: Event): void;
}
