import { PlayerMoveEvent } from "../../events/player-move.event";
import { GameObject } from "../game-objects/game-object";
import { Point } from "../game-objects/points";
import { Mouse } from "../input/mouse";
import { Scene } from "../scenes/scene";
import { EmptySprite } from "../sprites/empty-sprite";
import { Player } from "./player";

export class PlayerController extends GameObject {
    constructor(scene: Scene, private player: Player, private mouse: Mouse) {
        super(scene, new EmptySprite());
    }

    update(): void {
        if (this.shouldMove()) {
            this.player.moveTo(
                new Point(
                    this.player.transform.x -
                        (this.player.transform.x - this.mouse.position.x) / 30,
                    this.player.transform.y -
                        (this.player.transform.y - this.mouse.position.y) / 30
                )
            );
            this.scene.emit(new PlayerMoveEvent(this.player));
        }
    }

    private shouldMove() {
        return !(
            (this.player.transform.x > this.mouse.position.x - 1 &&
                this.player.transform.x < this.mouse.position.x + 1) ||
            (this.player.transform.y > this.mouse.position.y - 1 &&
                this.player.transform.y < this.mouse.position.y + 1)
        );
    }
}
