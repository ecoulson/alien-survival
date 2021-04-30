export interface CollisionStrategy<U, V> {
    doesCollide(a: U, b: V): boolean;
}