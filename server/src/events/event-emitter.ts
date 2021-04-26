import NativeEventEmitter from "events";
import { Event } from "./event";
import { EventListener } from "./event-listener";
import { EventType } from "./event-type";

export class EventEmitter {
    private emitter: NativeEventEmitter;

    constructor() {
        this.emitter = new NativeEventEmitter();
    }

    emit(event: Event) {
        this.emitter.emit(event.type.toString(), event);
    }

    on(type: EventType, handler: EventListener) {
        this.emitter.on(type.toString(), handler);
    }
}
