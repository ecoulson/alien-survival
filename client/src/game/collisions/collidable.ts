import { Collider } from "./collider";

export interface Collidable {
    getCollider(): Collider;
}