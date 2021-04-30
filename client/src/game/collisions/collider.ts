export interface Collider {
    isCollidingWith(otherCollider: Collider): boolean;
    destroy(): void;
}
