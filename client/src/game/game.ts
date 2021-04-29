import { Canvas } from "../canvas/canvas";
import { Event } from "../events/event";
import { EventEmitter } from "../events/event-emitter";
import { EventHandler } from "../events/event-handler";
import { EventType } from "../events/event-type";
import { Keyboard } from "./input/keyboard";
import { Mouse } from "./input/mouse";
import { MainScene } from "./scenes/main-scene";
import { Scene } from "./scenes/scene";

export class Game {
    private eventEmitter: EventEmitter;
    public readonly scene: Scene;
    public readonly mouse: Mouse;
    public readonly keyboard: Keyboard;

    constructor(public readonly canvas: Canvas) {
        this.eventEmitter = new EventEmitter();
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.scene = new MainScene(this);
    }

    start() {
        this.scene.init();
        this.gameLoop();
    }

    private gameLoop() {
        this.canvas.clear();
        this.scene.calculateCollisions();
        this.scene.update();
        this.scene.render(this.canvas);
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    on(eventType: EventType, handler: EventHandler) {
        this.eventEmitter.on(eventType, handler);
    }

    emit(event: Event) {
        this.eventEmitter.emit(event);
    }
}
