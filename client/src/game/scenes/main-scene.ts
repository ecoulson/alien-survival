import { Canvas } from "../../canvas/canvas";
import { Event } from "../../events/event";
import { EventHandler } from "../../events/event-handler";
import { EventType } from "../../events/event-type";
import { CollisionDetector } from "../collisions/collision-detector";
import { Game } from "../game";
import { GameObject } from "../game-objects/game-object";
import { PlayerManager } from "../player/player-manager";
import { WaveManger } from "../wave/wave-manager";
import { Scene } from "./scene";


export class MainScene implements Scene {
    private objects: GameObject[];
    private collisionDetector: CollisionDetector;

    constructor(private game: Game) {
        this.objects = [];
        this.collisionDetector = new CollisionDetector(this);
    }

    init() {
        this.addObjectToScene(new PlayerManager(this, this.game.mouse, this.game.keyboard));
        this.addObjectToScene(new WaveManger(this));
    }

    addObjectToScene(obj: GameObject) {
        this.objects.push(obj);
    }

    getObjectsInScene() {
        return this.objects;
    }

    render(canvas: Canvas) {
        this.objects.forEach((obj) => {
            canvas.save();
            obj.render(canvas);
            canvas.restore();
        });
    }

    calculateCollisions() {
        this.collisionDetector.calculateCollisions();
    }

    removeObjectFromScene(obj: GameObject) {
        const index = this.objects.findIndex((other) => obj.objectId().equals(other.objectId()));
        if (index === -1) {
            throw new Error(`Could not remove object with id ${obj.objectId().value}`);
        }
        this.objects.splice(index, 1);
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
