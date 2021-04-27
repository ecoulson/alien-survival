import { Sprite } from "../game-objects/sprite";

export class EmptySprite implements Sprite {
    width(): number {
        return 0;
    }

    height(): number {
        return 0;
    }

    render(): void {}
}