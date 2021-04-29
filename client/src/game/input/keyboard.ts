import { Key } from "./key";

export class Keyboard {
    private pressedMap: Map<Key | string, Boolean>;

    constructor() {
        this.pressedMap = new Map<Key | string, Boolean>();
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent) {
        this.pressedMap.set(event.key, true);
    }

    private handleKeyUp(event: KeyboardEvent) {
        this.pressedMap.set(event.key, false);
    }

    public isPressed(key: Key) {
        if (!this.pressedMap.has(key)) {
            return false;
        }
        return this.pressedMap.get(key);
    }
}
