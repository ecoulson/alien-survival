import { Id } from "../../common/id";
import { Point } from "../domain/point";

export interface PlayerProps {
    name: string;
    connectionId: Id;
    position: Point;
}
