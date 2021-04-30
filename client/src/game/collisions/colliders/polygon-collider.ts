import { Collider } from "../collider";

export class PolygonCollider implements Collider {
    isCollidingWith(): boolean {
        throw new Error(
            "Not implementing polygon colliders until I have a need for them. Feel free to submit a pull request with implementation"
        );
    }

    destroy() {}
}
