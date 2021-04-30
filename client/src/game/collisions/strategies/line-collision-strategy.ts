import { Segment } from "../../math/segment";
import { Vector2D } from "../../math/vector2d";
import { CollisionStrategy } from "./collision-strategy";

export class LineCollisionStrategy implements CollisionStrategy<Segment, Segment> {
    doesCollide(lineA: Segment, lineB: Segment): boolean {
        let p1 = lineA.getOrigin();
        let p2 = lineB.getOrigin();
        let q1 = lineA.getEnd();
        let q2 = lineB.getEnd();

        let orientation1 = this.orientation(p1, q1, p2);
        let orientation2 = this.orientation(p1, q1, q2);
        let orientation3 = this.orientation(p2, q2, p1);
        let orientation4 = this.orientation(p2, q2, q1);

        if (orientation1 !== orientation2 && orientation3 !== orientation4) {
            return true;
        }

        if (orientation1 == 0 && this.isOnSegment(p1, p2, q1)) {
            return true;
        }
        if (orientation2 == 0 && this.isOnSegment(p1, q2, q1)) {
            return true;
        }

        if (orientation3 == 0 && this.isOnSegment(p2, p1, q2)) {
            return true;
        }

        if (orientation4 == 0 && this.isOnSegment(p2, q1, q2)) {
            return true;
        }
        return false;
    }

    private isOnSegment(p: Vector2D, q: Vector2D, r: Vector2D) {
        return (
            q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)
        );
    }

    private orientation(p: Vector2D, q: Vector2D, r: Vector2D) {
        let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

        if (val == 0) {
            return 0;
        } // colinear

        return val > 0 ? 1 : 2; // clock or counterclock wise
    }
}
