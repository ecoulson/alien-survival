import { Collidable } from "./collidable";

export interface Collider {
    isColliding(otherObject: Collidable): boolean;
}
