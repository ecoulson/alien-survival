import { GameObject } from "../game-objects/game-object";

export class Collision {
    constructor(private a: GameObject, private b: GameObject) {}

    public get pair(): [GameObject, GameObject] {
        return [this.a, this.b];
    }
}
