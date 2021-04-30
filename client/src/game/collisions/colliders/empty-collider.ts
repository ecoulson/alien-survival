import { Collider } from "../collider";

export class EmptyCollider implements Collider {
    isCollidingWith(): boolean {
        return false;
    }
}
