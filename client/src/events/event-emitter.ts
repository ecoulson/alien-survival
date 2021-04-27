import { Event } from "./event";
import { EventHandler } from "./event-handler";
import { EventType } from "./event-type";

export class EventEmitter {
    private eventHandlerMapping: Map<EventType, EventHandler[]>;

    constructor() {
        this.eventHandlerMapping = new Map<EventType, EventHandler[]>();
    }

    emit(event: Event) {
        if (this.eventHandlerMapping.has(event.type)) {
            this.eventHandlerMapping
                .get(event.type)!
                .forEach((handler) => handler(event));
        }
    }

    on(type: EventType, handler: EventHandler) {
        if (!this.eventHandlerMapping.has(type)) {
            this.eventHandlerMapping.set(type, [handler]);
        } else {
            this.eventHandlerMapping.get(type)!.push(handler);
        }
    }
}
