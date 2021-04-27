import { Canvas } from "../canvas/canvas";
import { Event } from "../events/event";
import { EventEmitter } from "../events/event-emitter";
import { EventHandler } from "../events/event-handler";
import { EventType } from "../events/event-type";
import { Mouse } from "./input/mouse";
import { MainScene } from "./scenes/main-scene";
import { Scene } from "./scenes/scene";

export class Game {
    private eventEmitter: EventEmitter;
    public readonly scene: Scene;
    public readonly mouse: Mouse;

    constructor(public readonly canvas: Canvas) {
        this.eventEmitter = new EventEmitter();
        this.mouse = new Mouse();
        this.scene = new MainScene(this);
    }

    start() {
        this.scene.init();
        this.render();
    }

    private render() {
        this.canvas.clear();
        this.scene.update();
        this.scene.render(this.canvas);
        requestAnimationFrame(this.render.bind(this));
    }

    on(eventType: EventType, handler: EventHandler) {
        this.eventEmitter.on(eventType, handler);
    }

    emit(event: Event) {
        this.eventEmitter.emit(event);
    }
}
