import { GameObject } from "../game-objects/game-object";
import { Vector2D } from "../math/vector2d";
import { Scene } from "../scenes/scene";
import { BasicGunSprite } from "./basic-gun-sprite";
import { Bullet } from "./bullet";

export class BasicGun extends GameObject {
    private static readonly OFFSET_RADIUS_FROM_PLAYER = 20;

    private fireRateInMiliseconds: number;
    private lastFire: number;

    constructor(scene: Scene, private parent: GameObject) {
        super(scene, new BasicGunSprite());
        this.fireRateInMiliseconds = 500;
        this.lastFire = Date.now();
    }

    update(): void {
        this.transform.rotation = this.parent.transform.rotation;
        const rotationInRadians = this.transform.rotation.toRadians().value;

        this.setPosition(
            new Vector2D(
                this.parent.transform.position.x +
                    BasicGun.OFFSET_RADIUS_FROM_PLAYER * Math.cos(rotationInRadians),
                this.parent.transform.position.y +
                    BasicGun.OFFSET_RADIUS_FROM_PLAYER * Math.sin(rotationInRadians)
            )
        );
    }

    fire() {
        let now = Date.now();
        if (now > this.lastFire + this.fireRateInMiliseconds) {
            this.lastFire = now;
            // instead of spawning bullet with a collider it should instead raycast in that directon to see if any colliders will be hit
            
            this.scene.addObjectToScene(new Bullet(this.scene, this.transform));
        }
    }
}
