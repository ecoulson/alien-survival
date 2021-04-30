import { PlayerMoveEvent } from "../../events/player-move.event";
import { Angle } from "../math/angle";
import { AngleType } from "../math/angle-type";
import { GameObject } from "../game-objects/game-object";
import { Vector2D } from "../math/vector2d";
import { Key } from "../input/key";
import { Keyboard } from "../input/keyboard";
import { Mouse } from "../input/mouse";
import { MouseButton } from "../input/mouse-button";
import { Scene } from "../scenes/scene";
import { Player } from "./player";

export class PlayerController extends GameObject {
    constructor(
        scene: Scene,
        private player: Player,
        private mouse: Mouse,
        private keyboard: Keyboard
    ) {
        super(scene);
    }

    update(): void {
        if (this.shouldMove() && this.mouse.isPressed(MouseButton.Left)) {
            this.player.moveTo(this.calculateNextPosition());
        }
        this.player.transform.rotation = this.calculateRotation();
        this.scene.emit(new PlayerMoveEvent(this.player));
        if (this.keyboard.isPressed(Key.Space)) {
            this.player.shoot();
        }
    }

    private shouldMove() {
        return !(
            (this.player.transform.position.x > this.mouse.position.x - 1 &&
                this.player.transform.position.x < this.mouse.position.x + 1) ||
            (this.player.transform.position.y > this.mouse.position.y - 1 &&
                this.player.transform.position.y < this.mouse.position.y + 1)
        );
    }

    private calculateRotation() {
        let x = this.mouse.position.x - this.player.transform.position.x;
        let y = this.mouse.position.y - this.player.transform.position.y;
        return new Angle(AngleType.Radians, Math.atan2(y, x) + Math.PI / 2);
    }

    private calculateNextPosition() {
        return new Vector2D(
            this.player.transform.position.x -
                (this.player.transform.position.x - this.mouse.position.x) / 60,
            this.player.transform.position.y -
                (this.player.transform.position.y - this.mouse.position.y) / 60
        );
    }
}
